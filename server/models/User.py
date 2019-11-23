import jwt
import datetime
import os
from common.db import db


boards = db.Table(
    "boards_users",
    db.Column("board_id", db.Integer, db.ForeignKey("boards.id"), primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    hashed_pass = db.Column(db.String(120), nullable=False)
    boards = db.relationship(
        "Board",
        secondary=boards,
        lazy="subquery",
        backref=db.backref("users", lazy=True),
    )

    def __init__(self, email, hashed_pass):
        self.email = email
        self.hashed_pass = hashed_pass

    def __repr__(self):
        return "<User %r>" % self.email

    def generate_token(self):
        try:
            now = datetime.datetime.utcnow()
            payload = {
                "exp": now + datetime.timedelta(days=1),
                "iat": now,
                "sub": self.id,
            }
            token = jwt.encode(
                payload, os.getenv("JWT_SECRET"), algorithm="HS256"
            ).decode("utf-8")
            return token
        except Exception as e:
            raise e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, os.getenv("JWT_SECRET"))
            return payload["sub"]
        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again."

    def get_boards(self):
        boards = [b.serialize() for b in self.boards]
        return boards
