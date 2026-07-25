from datetime import datetime

from flask import Blueprint, request, jsonify

from Backend.app.extensions import db
from Backend.app.models import Listing
from Backend.app.utils.auth_helpers import business_required, current_identity

listings_bp = Blueprint("listings", __name__, url_prefix="/api/listings")


@listings_bp.route("", methods=["GET"])
def browse_listings():
    """Public live feed. Supports ?status=available and simple pagination."""
    query = Listing.query
    status = request.args.get("status", "available")
    if status != "all":
        query = query.filter_by(status=status)

    # auto-expire past-deadline listings on read
    now = datetime.utcnow()
    expired = query.filter(Listing.pickup_deadline < now, Listing.status == "available").all()
    for listing in expired:
        listing.status = "expired"
    if expired:
        db.session.commit()

    query = Listing.query
    if status != "all":
        query = query.filter_by(status=status)

    page = request.args.get("page", 1, type=int)
    per_page = min(request.args.get("per_page", 20, type=int), 100)
    pagination = query.order_by(Listing.pickup_deadline.asc()).paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        "listings": [listing.to_dict() for listing in pagination.items],
        "page": pagination.page,
        "pages": pagination.pages,
        "total": pagination.total,
    }), 200


@listings_bp.route("/<int:listing_id>", methods=["GET"])
def get_listing(listing_id):
    listing = Listing.query.get_or_404(listing_id)
    return jsonify(listing.to_dict()), 200


@listings_bp.route("", methods=["POST"])
@business_required
def create_listing():
    business_id, _ = current_identity()
    data = request.get_json() or {}

    required = ("item_name", "quantity", "original_price", "discounted_price", "pickup_deadline")
    if not all(data.get(f) is not None for f in required):
        return jsonify({"error": f"Required fields: {', '.join(required)}"}), 400

    try:
        deadline = datetime.fromisoformat(data["pickup_deadline"])
    except ValueError:
        return jsonify({"error": "pickup_deadline must be ISO 8601, e.g. 2026-07-22T18:00:00"}), 400

    listing = Listing(
        business_id=business_id,
        item_name=data["item_name"],
        description=data.get("description"),
        quantity=data["quantity"],
        original_price=data["original_price"],
        discounted_price=data["discounted_price"],
        pickup_deadline=deadline,
    )
    db.session.add(listing)
    db.session.commit()
    return jsonify(listing.to_dict()), 201


@listings_bp.route("/<int:listing_id>", methods=["PUT"])
@business_required
def update_listing(listing_id):
    business_id, _ = current_identity()
    listing = Listing.query.get_or_404(listing_id)

    if listing.business_id != business_id:
        return jsonify({"error": "You do not own this listing"}), 403

    data = request.get_json() or {}
    for field in ("item_name", "description", "quantity", "original_price", "discounted_price", "status", "flagged_stale"):
        if field in data:
            setattr(listing, field, data[field])
    if "pickup_deadline" in data:
        try:
            listing.pickup_deadline = datetime.fromisoformat(data["pickup_deadline"])
        except ValueError:
            return jsonify({"error": "pickup_deadline must be ISO 8601"}), 400

    db.session.commit()
    return jsonify(listing.to_dict()), 200


@listings_bp.route("/<int:listing_id>", methods=["DELETE"])
@business_required
def delete_listing(listing_id):
    business_id, _ = current_identity()
    listing = Listing.query.get_or_404(listing_id)

    if listing.business_id != business_id:
        return jsonify({"error": "You do not own this listing"}), 403

    db.session.delete(listing)
    db.session.commit()
    return jsonify({"message": "Listing deleted"}), 200


@listings_bp.route("/mine", methods=["GET"])
@business_required
def my_listings():
    """Business dashboard: all of this business's listings, any status."""
    business_id, _ = current_identity()
    listings = Listing.query.filter_by(business_id=business_id).order_by(Listing.created_at.desc()).all()
    return jsonify([listing.to_dict(include_business=False) for listing in listings]), 200
