from marshmallow import Schema, fields, pprint


class LoginOrRegisterSchema(Schema):
    email = fields.Email(
        required=True,
        error_messages={"required": {"message": "Email is required", "code": 400}},
    )
    password = fields.String(
        required=True,
        error_messages={"required": {"message": "Password is required", "code": 400}},
    )
