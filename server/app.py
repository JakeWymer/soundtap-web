import os
from dotenv import load_dotenv
from flask import Flask
from flask_restful import Resource, Api
from common.db import db
from models import *
import resources

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("POSTGRES_CONNECTION_STRING")
api = Api(app)
db.init_app(app)

# Auth
api.add_resource(resources.Register, "/auth/register")
api.add_resource(resources.Login, "/auth/login")

# Boards
api.add_resource(resources.Boards, "/api/boards")

if __name__ == "__main__":
    print("Building database schema")
    with app.app_context():
        db.create_all()

    app.run(debug=True)
