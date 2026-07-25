import secrets
from datetime import datetime, timedelta

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt

from Backend.app.extensions import db, mail
from Backend.app.models import User, Business
from flask_mail import Message

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


def _issue_token(entity_id, entity_type):
    return create_access_token(identity=str(entity_id), additional_claims={"type": entity_type})


# ---------- Signup ----------

@auth_bp.route("/signup/user", methods=["POST"])
def signup_user():
    data = request.get_json() or {}
    required = ("name", "email", "password")
    if not all(data.get(f) for f in required):
        return jsonify({"error": "name, email and password are required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already registered"}), 409

    user = User(name=data["name"], email=data["email"], phone=data.get("phone"))
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()

    token = _issue_token(user.id, "user")
    return jsonify({"token": token, "user": user.to_dict()}), 201


@auth_bp.route("/signup/business", methods=["POST"])
def signup_business():
    data = request.get_json() or {}
    required = ("name", "email", "password")
    if not all(data.get(f) for f in required):
        return jsonify({"error": "name, email and password are required"}), 400

    if Business.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already registered"}), 409

    business = Business(
        name=data["name"],
        email=data["email"],
        phone=data.get("phone"),
        address=data.get("address"),
        latitude=data.get("latitude"),
        longitude=data.get("longitude"),
    )
    business.set_password(data["password"])
    db.session.add(business)
    db.session.commit()

    token = _issue_token(business.id, "business")
    return jsonify({"token": token, "business": business.to_dict()}), 201


# ---------- Login ----------

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")  # "user" or "business"

    if not email or not password or role not in ("user", "business"):
        return jsonify({"error": "email, password and role ('user' or 'business') are required"}), 400

    model = User if role == "user" else Business
    entity = model.query.filter_by(email=email).first()

    if not entity or not entity.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = _issue_token(entity.id, role)
    return jsonify({"token": token, role: entity.to_dict()}), 200


# ---------- Password reset ----------

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json() or {}
    email = data.get("email")
    role = data.get("role")

    if not email or role not in ("user", "business"):
        return jsonify({"error": "email and role are required"}), 400

    model = User if role == "user" else Business
    entity = model.query.filter_by(email=email).first()

    # Always respond 200 to avoid leaking which emails are registered
    if entity:
        token = secrets.token_urlsafe(32)
        entity.reset_token = token
        entity.reset_token_expires_at = datetime.utcnow() + timedelta(hours=1)
        db.session.commit()

        reset_link = f"{current_app.config['FRONTEND_URL']}/reset-password?token={token}&role={role}"
        try:
            msg = Message(
                subject="Reset your Usiwaste password",
                recipients=[email],
                body=f"Reset your password here: {reset_link}\nThis link expires in 1 hour.",
            )
            mail.send(msg)
        except Exception as exc:  # noqa: BLE001
            current_app.logger.warning("Failed to send reset email: %s", exc)

    return jsonify({"message": "If that email is registered, a reset link has been sent."}), 200


@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json() or {}
    token = data.get("token")
    role = data.get("role")
    new_password = data.get("password")

    if not token or role not in ("user", "business") or not new_password:
        return jsonify({"error": "token, role and password are required"}), 400

    model = User if role == "user" else Business
    entity = model.query.filter_by(reset_token=token).first()

    if not entity or not entity.reset_token_expires_at or entity.reset_token_expires_at < datetime.utcnow():
        return jsonify({"error": "Invalid or expired token"}), 400

    entity.set_password(new_password)
    entity.reset_token = None
    entity.reset_token_expires_at = None
    db.session.commit()

    return jsonify({"message": "Password updated successfully"}), 200


# ---------- Current identity ----------

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    from Backend.app.utils.auth_helpers import current_identity

    entity_id, entity_type = current_identity()
    model = User if entity_type == "user" else Business
    entity = model.query.get_or_404(entity_id)
    return jsonify({"type": entity_type, **entity.to_dict()}), 200
