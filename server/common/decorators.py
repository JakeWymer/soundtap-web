import jwt
import os
from flask import request, abort
from functools import wraps
from marshmallow import ValidationError
from models.User import User


def validate_request(schema):
    # Validates the request body or params and exposes either body or params to decorated method
    def wrap(f):
        @wraps(f)
        def wrapped_f(*args, **kwargs):
            try:
                if request.method == "GET":
                    data = dict(request.args)
                    kwargs["params"] = data
                else:
                    data = request.json
                    kwargs["body"] = data
                schema().load(data)
                return f(*args, **kwargs)
            except ValidationError as err:
                print(err.messages)
                return abort(400)

        return wrapped_f

    return wrap


def validate_token(f):
    # Validates jwt and exposes a user object to the method it decorates
    # Renews the jwt and appends it to the return value
    @wraps(f)
    def wrapped(*args, **kwargs):
        try:
            token = request.headers["Authorization"][7:]
            user_id = User.decode_auth_token(token)
            user = User.query.get(user_id)
            kwargs["user"] = user
            result = f(*args, **kwargs)
            response = {"data": result, "jwt": user.generate_token()}
            return response
        except jwt.ExpiredSignatureError:
            return abort(401)

    return wrapped
