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


class BoardSchema(Schema):
    title = fields.String(
        required=True,
        error_message={"required": {"message": "Title is required", "code": 400}},
    )
