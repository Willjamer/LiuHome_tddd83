from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from request_handler_stub import courier

app = Flask(__name__)
handler = courier()
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db = SQLAlchemy(app)
CORS(app, origins=["http://localhost:3000"])  # Allow requests from the frontend

@app.route("/")
def home():
    return jsonify({"message": "Flask Backend Running"})

@app.route("/api/add-appartment")
def add_appartment():
    json_data = request.get_json()
    return handler.handle_json_add(json_data)

@app.route("/api/get-appartment")
def get_appartment():
    return handler.get_appartment

@app.route("/api/get-user-profile")
def get_user_profile():
    return handler.get_user_profile

@app.route("/api/get-user")
def get_user():
    return handler.get_user

@app.route("/api/get-listing")
def get_listing():
    json_data = request.get_json()
    return handler.get_Listing(json_data)

@app.route("/api/remove-item")
def remove_item():
    json_data = request.get_json()
    return handler.remove_item(json_data)

@app.route("/api/edit-item")
def edit_item():
    json_data = request.get_json()
    return handler.edit_item(json_data)



if __name__ == "__main__":
    app.run(debug=True)