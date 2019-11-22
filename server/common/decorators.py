from flask import request, abort
from marshmallow import ValidationError


def validate_request(schema):
    def wrap(f):
        def wrapped_f(*args):
            try:
                schema().load(request.json)
                return f(*args)
            except ValidationError as err:
                print(err.messages)
                return abort(400)

        return wrapped_f

    return wrap
