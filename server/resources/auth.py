from flask import request, abort, jsonify
from flask_restful import Resource
from werkzeug.security import generate_password_hash, check_password_hash
from models.User import User
from common.decorators import validate_request, validate_token
from common.db import db
from common.req_schemas import LoginOrRegisterSchema


class Register(Resource):
    @validate_request(schema=LoginOrRegisterSchema)
    def post(self, body):
        try:
            email = body["email"]
            password = body["password"]
            if User.query.filter_by(email=email).first():
                return abort(409, "This email already exists")
            hashed = generate_password_hash(password)
            user = User(email, hashed)
            db.session.add(user)
            db.session.commit()
            res = {"jwt": user.generate_token()}
            return res
        except Exception as err:
            print(err)
            raise err


class Login(Resource):
    @validate_request(schema=LoginOrRegisterSchema)
    def post(self, body):
        try:
            email = body["email"]
            password = body["password"]
            user = User.query.filter_by(email=email).first()
            if not user:
                return abort(400, "Incorrect email")
            if check_password_hash(user.hashed_pass, password):
                return {"jwt": user.generate_token()}
        except Exception as err:
            print(err)
            raise err
        return abort(400, "Incorrect password")
