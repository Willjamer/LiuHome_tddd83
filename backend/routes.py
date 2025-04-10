from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging

# OM STUB, KÖR DENNA: 
# from request_handler_stub import courier

# OM VANLIG (databas), KÖR DENNA:
from request_handler import courier

logging.basicConfig(level=logging.DEBUG)
handler = courier()

apartments_bp = Blueprint('apartments', __name__)
@apartments_bp.route("/api/get-apartments", methods=['GET', 'OPTIONS'])
def get_apartments():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    elif request.method == 'GET':
        logging.info("routes get ok")
        return handler.get_all_apartments()

    # elif request.method == 'PUT':
        # print("test 456")
        # json_data = request.get_json()
        # return handler.filter_apartment(json_data)

def _build_cors_preflight_response():
    response = jsonify({'message': 'CORS preflight'})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,OPTIONS")
    return response


@apartments_bp.route("/hello")
def home():
    return jsonify({"message": "Flask Backend Running"})

@apartments_bp.route("/sign-up", methods = ['POST'])
def add_new_user():
    json_data = request.get_json()
    return handler.add_user(json_data)

@apartments_bp.route('/login', methods = ['POST'])
def login():
    json_data = request.get_json()
    return handler.login(json_data)

@apartments_bp.route("/api/add-apartment", methods=['POST'])
# @jwt_required()
def add_appartment():
    json_data = request.get_json()
    # user_id = get_jwt_identity()
    # json_data['user_id'] = user_id
    return handler.add_apartment(json_data)

@apartments_bp.route("/api/get-user-profile", methods=['GET'])
def get_user_profile():
    return handler.get_user_profile

@apartments_bp.route("/api/get-user", methods=['GET'])
def get_user():
    return handler.get_user()

@apartments_bp.route("/api/get-listing", methods=['GET'])
def get_listing():
    json_data = request.get_json()
    return handler.get_Listing(json_data)

#lagt till denna, osäker på hur korrekt det är /Nils
@apartments_bp.route("/api/browseSpecific/<int:apartment_id>", methods=['GET'])
def get_specific_apartment(apartment_id):
    return handler.get_specific_apartment(apartment_id)


@apartments_bp.route("/api/remove-item", methods=['POST'])
@jwt_required()
def remove_item():
    json_data = request.get_json()
    return handler.remove_item(json_data)

@apartments_bp.route("/api/edit-item", methods=['POST'])
@jwt_required()
def edit_item():
    json_data = request.get_json()
    return handler.edit_item(json_data)


