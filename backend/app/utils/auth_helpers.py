from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt, get_jwt_identity


def user_required(fn):
    """Allows only tokens issued to a User (customer)."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        if claims.get("type") != "user":
            return jsonify({"error": "User account required"}), 403
        return fn(*args, **kwargs)
    return wrapper


def business_required(fn):
    """Allows only tokens issued to a Business."""
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        if claims.get("type") != "business":
            return jsonify({"error": "Business account required"}), 403
        return fn(*args, **kwargs)
    return wrapper


def current_identity():
    """Returns (id:int, type:str) for the current JWT."""
    claims = get_jwt()
    return int(get_jwt_identity()), claims.get("type")
