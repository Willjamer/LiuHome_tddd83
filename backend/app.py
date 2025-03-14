from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
handler = courier()
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)
CORS(app, origins=["http://localhost:3000"])  # Allow requests from the frontend


if __name__ == "__main__":
    app.run(debug=True)