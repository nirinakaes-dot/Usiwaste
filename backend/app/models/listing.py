from datetime import datetime
from backend.app.extensions import db


class Listing(db.Model):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)

    item_name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    original_price = db.Column(db.Numeric(10, 2), nullable=False)
    discounted_price = db.Column(db.Numeric(10, 2), nullable=False)
    pickup_deadline = db.Column(db.DateTime, nullable=False)

    # available -> reserved -> picked_up, or expired
    status = db.Column(db.String(20), nullable=False, default="available")
    flagged_stale = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    business = db.relationship("Business", back_populates="listings")
    orders = db.relationship("Order", back_populates="listing", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="listing", cascade="all, delete-orphan")
    favorited_by = db.relationship("Favorite", back_populates="listing", cascade="all, delete-orphan")

    def to_dict(self, include_business=True):
        data = {
            "id": self.id,
            "business_id": self.business_id,
            "item_name": self.item_name,
            "description": self.description,
            "quantity": self.quantity,
            "original_price": float(self.original_price),
            "discounted_price": float(self.discounted_price),
            "pickup_deadline": self.pickup_deadline.isoformat() if self.pickup_deadline else None,
            "status": self.status,
            "flagged_stale": self.flagged_stale,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
        if include_business and self.business:
            data["business"] = {"id": self.business.id, "name": self.business.name, "address": self.business.address}
        return data

