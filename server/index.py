import os
from dotenv import load_dotenv
from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("POSTGRES_CONNECTION_STRING")
api = Api(app)
db = SQLAlchemy(app)

if __name__ == "__main__":
    app.run(debug=True)
