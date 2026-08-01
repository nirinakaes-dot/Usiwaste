from datetime import datetime

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models import Order, Listing
from app.utils.auth_helpers import user_required, business_required, current_identity

orders_bp = Blueprint("orders", __name__, url_prefix="/api/orders")


@orders_bp.route("", methods=["POST"])
@user_required
def create_order():
    """Customer reserves a listing."""
    user_id, _ = current_identity()
    data = request.get_json() or {}
    listing_id = data.get("listing_id")

    if not listing_id:
        return jsonify({"error": "listing_id is required"}), 400

    listing = Listing.query.get_or_404(listing_id)

    if listing.status != "available":
        return jsonify({"error": "This listing is no longer available"}), 409
    if listing.pickup_deadline < datetime.utcnow():
        listing.status = "expired"
        db.session.commit()
        return jsonify({"error": "This listing's pickup deadline has passed"}), 409

    order = Order(user_id=user_id, listing_id=listing_id, status="reserved")
    listing.status = "reserved"
    db.session.add(order)
    db.session.commit()
    return jsonify(order.to_dict()), 201


@orders_bp.route("", methods=["GET"])
@user_required
def my_orders():
    user_id, _ = current_identity()
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders]), 200


@orders_bp.route("/<int:order_id>", methods=["PUT"])
@jwt_required()
def update_order(order_id):
    """Either the customer (cancel) or the business (mark picked_up) can update status."""
    entity_id, entity_type = current_identity()
    order = Order.query.get_or_404(order_id)
    data = request.get_json() or {}
    new_status = data.get("status")

    if entity_type == "user":
        if order.user_id != entity_id:
            return jsonify({"error": "Not your order"}), 403
        if new_status != "cancelled":
            return jsonify({"error": "Customers may only cancel an order"}), 400
        order.status = "cancelled"
        order.listing.status = "available"

    elif entity_type == "business":
        if order.listing.business_id != entity_id:
            return jsonify({"error": "Not your listing"}), 403
        if new_status != "picked_up":
            return jsonify({"error": "Businesses may only mark an order picked_up"}), 400
        order.status = "picked_up"
        order.listing.status = "picked_up"

    db.session.commit()
    return jsonify(order.to_dict()), 200