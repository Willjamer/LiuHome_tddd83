from app import app
from flask import Flask, jsonify, request
from request_handler_stub import courier
from flask_jwt_extended import jwt_required, get_jwt_identity
# from request_handler import courier

handler = courier()

@app.route("/hello")
def home():
    return jsonify({"message": "Flask Backend Running"})

@app.route("/sign-up", methods = ['POST'])
def add_new_user():
    json_data = request.get_json()
    return handler.add_user(json_data)

@app.route('/login', methods = ['POST'])
def login():
    json_data = request.get_json()
    return handler.login(json_data)

@app.route("/api/add-appartment", methods=['POST'])
@jwt_required()
def add_appartment():
    json_data = request.get_json()
    user_id = get_jwt_identity()
    json_data['user_id'] = user_id
    return handler.add_apartment(json_data)

@app.route("/api/get-apartments", methods=['GET'])
def get_appartments():
    print("test 123")
    return handler.get_all_appartments()

@app.route("/api/get-user-profile", methods=['GET'])
def get_user_profile():
    return handler.get_user_profile

@app.route("/api/get-user", methods=['GET'])
def get_user():
    return handler.get_user

@app.route("/api/get-listing", methods=['GET'])
def get_listing():
    json_data = request.get_json()
    return handler.get_Listing(json_data)

@app.route("/api/remove-item", methods=['POST'])
@jwt_required()
def remove_item():
    json_data = request.get_json()
    return handler.remove_item(json_data)

@app.route("/api/edit-item", methods=['POST'])
@jwt_required()
def edit_item():
    json_data = request.get_json()
    return handler.edit_item(json_data)


