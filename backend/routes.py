from flask import jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging

# OM STUB, KÖR DENNA: 
#from request_handler_stub import courier

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
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
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
    sso_id = request.args.get("sso_id")
    if not sso_id:
        return jsonify({"error": "Missing sso_id"}), 400
    return handler.get_user_profile({"sso_id": sso_id})

@apartments_bp.route("/api/update-user-profile", methods=['POST'])
def update_user_profile():
    logging.info('rt updus ok')
    json_data = request.get_json()
    logging.info(json_data)
    return handler.update_user_profile(json_data)

@apartments_bp.route("/api/get-user/<user_id>", methods=['GET', 'OPTIONS'])
def get_user(user_id):
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    logging.info('routes getus ok')
    logging.info(user_id)
    tmp = user_id
    return handler.get_user(user_id)

@apartments_bp.route("/api/get-listing", methods=['GET'])
def get_listing():
    json_data = request.get_json()
    return handler.get_Listing(json_data)

#lagt till denna, osäker på hur korrekt det är /Nils
@apartments_bp.route("/api/browseSpecific/<int:apartment_id>", methods=['GET'])
def get_specific_apartment(apartment_id):
    return handler.get_specific_apartment(apartment_id)


@apartments_bp.route("/api/remove-apartment", methods=['POST'])
def remove_item():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    json_data = request.get_json()
    return handler.remove_apartment(json_data)

@apartments_bp.route("/api/edit-item", methods=['POST'])
@jwt_required()
def edit_item():
    
    json_data = request.get_json()
    return handler.edit_item(json_data)


