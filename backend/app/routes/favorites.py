from flask import Blueprint, request, jsonify

from app.extensions import db
from app.models import Favorite, Listing
from app.utils.auth_helpers import user_required, current_identity

favorites_bp = Blueprint("favorites", __name__, url_prefix="/api/favorites")


@favorites_bp.route("", methods=["GET"])
@user_required
def list_favorites():
    user_id, _ = current_identity()
    favorites = Favorite.query.filter_by(user_id=user_id).order_by(Favorite.created_at.desc()).all()
    return jsonify([fav.to_dict() for fav in favorites]), 200


@favorites_bp.route("", methods=["POST"])
@user_required
def add_favorite():
    user_id, _ = current_identity()
    data = request.get_json() or {}
    listing_id = data.get("listing_id")

    if not listing_id:
        return jsonify({"error": "listing_id is required"}), 400

    Listing.query.get_or_404(listing_id)

    if Favorite.query.filter_by(user_id=user_id, listing_id=listing_id).first():
        return jsonify({"error": "Already favorited"}), 409

    favorite = Favorite(user_id=user_id, listing_id=listing_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify(favorite.to_dict()), 201


@favorites_bp.route("/<int:favorite_id>", methods=["DELETE"])
@user_required
def remove_favorite(favorite_id):
    user_id, _ = current_identity()
    favorite = Favorite.query.get_or_404(favorite_id)

    if favorite.user_id != user_id:
        return jsonify({"error": "Not your favorite"}), 403

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Removed from favorites"}), 200

