from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)
CORS(app, origins=["http://localhost:3000"])  # Allow requests from the frontend

@app.route("/")
def home():
    return jsonify({"message": "Flask Backend Running"})

@app.route("/api/data")
def get_data():
    return jsonify({"message": "YOOOOOOOOO THIS IS THE BACKEND SPEAKING"})

if __name__ == "__main__":
    app.run(debug=True)