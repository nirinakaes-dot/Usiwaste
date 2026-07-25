<<<<<<< HEAD:backend/app/__init__.py
import os
import sys
from flask_cors import CORS
=======
from flask import Flask, jsonify
>>>>>>> parent of ec6266b (changes'):Backend/app/__init__.py

from ..config import Config
from Backend.app.extensions import db, migrate, jwt, bcrypt, cors, mail


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app, supports_credentials=True, origins=["https://usiwaste-726s.vercel.app"])

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)

    from Backend.app.models import User, Business, Listing, Order, Review, Favorite  # noqa: F401

    from Backend.app.routes.auth import auth_bp
    from Backend.app.routes.listings import listings_bp
    from Backend.app.routes.orders import orders_bp
    from Backend.app.routes.favorites import favorites_bp
    from Backend.app.routes.reviews import reviews_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(listings_bp)
    app.register_blueprint(orders_bp)
    app.register_blueprint(favorites_bp)
    app.register_blueprint(reviews_bp)

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"}), 200

    @app.errorhandler(404)
    def not_found(_e):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(_e):
        return jsonify({"error": "Internal server error"}), 500

    return app
