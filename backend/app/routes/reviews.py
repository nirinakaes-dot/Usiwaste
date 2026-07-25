from flask import Blueprint, request, jsonify

from Backend.app.extensions import db
from Backend.app.models import Review, Order, Listing
from Backend.app.utils.auth_helpers import user_required, current_identity

reviews_bp = Blueprint("reviews", __name__, url_prefix="/api/reviews")


@reviews_bp.route("", methods=["POST"])
@user_required
def create_review():
    user_id, _ = current_identity()
    data = request.get_json() or {}
    order_id = data.get("order_id")
    rating = data.get("rating")

    if not order_id or rating is None:
        return jsonify({"error": "order_id and rating are required"}), 400
    if not (1 <= int(rating) <= 5):
        return jsonify({"error": "rating must be between 1 and 5"}), 400

    order = Order.query.get_or_404(order_id)

    if order.user_id != user_id:
        return jsonify({"error": "Not your order"}), 403
    if order.status != "picked_up":
        return jsonify({"error": "You can only review after pickup"}), 400
    if order.review:
        return jsonify({"error": "This order has already been reviewed"}), 409

    review = Review(
        order_id=order.id,
        user_id=user_id,
        listing_id=order.listing_id,
        rating=int(rating),
        comment=data.get("comment"),
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201


@reviews_bp.route("/listing/<int:listing_id>", methods=["GET"])
def reviews_for_listing(listing_id):
    Listing.query.get_or_404(listing_id)
    reviews = Review.query.filter_by(listing_id=listing_id).order_by(Review.created_at.desc()).all()
    return jsonify([review.to_dict() for review in reviews]), 200


@reviews_bp.route("/business/<int:business_id>", methods=["GET"])
def reviews_for_business(business_id):
    reviews = (
        Review.query.join(Listing, Review.listing_id == Listing.id)
        .filter(Listing.business_id == business_id)
        .order_by(Review.created_at.desc())
        .all()
    )
    return jsonify([review.to_dict() for review in reviews]), 200
