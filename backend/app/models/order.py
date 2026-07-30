from datetime import datetime
from app.extensions import db


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey("listings.id"), nullable=False)

    # reserved -> picked_up / cancelled
    status = db.Column(db.String(20), nullable=False, default="reserved")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="orders")
    listing = db.relationship("Listing", back_populates="orders")
    review = db.relationship("Review", back_populates="order", uselist=False, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "listing_id": self.listing_id,
            "listing": self.listing.to_dict() if self.listing else None,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

