import marshmallow
from flask import request, abort, jsonify
from flask_restful import Resource
from common.db import db
from common.decorators import validate_token, validate_request
from common.req_schemas import BoardSchema
from models.Board import Board


class Boards(Resource):
    @validate_request(schema=BoardSchema)
    @validate_token
    def post(self, user, body):
        board = Board(body["title"])
        user.boards.append(board)
        db.session.add(user)
        db.session.commit()
        boards = user.get_boards()
        return boards

    @validate_token
    def get(self, user):
        boards = user.get_boards()
        return boards
