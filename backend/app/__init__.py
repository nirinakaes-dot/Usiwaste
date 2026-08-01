from flask import Flask, jsonify

from config import Config
from app.extensions import db, migrate, jwt, bcrypt, cors, mail
from flask_cors import CORS

from backend.config import Config


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})
    mail.init_app(app)

    from app.models import User, Business, Listing, Order, Review, Favorite  # noqa: F401

    from app.routes.auth import auth_bp
    from app.routes.listings import listings_bp
    from app.routes.orders import orders_bp
    from app.routes.favorites import favorites_bp
    from app.routes.reviews import reviews_bp


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

