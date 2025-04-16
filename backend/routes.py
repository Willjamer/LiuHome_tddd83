from flask import jsonify, request, Blueprint, current_app, session, redirect, url_for, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging
from authextension import get_auth
import requests


# OM STUB, KÖR DENNA: 
# from request_handler_stub import courier

# OM VANLIG (databas), KÖR DENNA:
from request_handler import courier

logging.basicConfig(level=logging.DEBUG)
handler = courier()

oauth = get_auth()
apartments_bp = Blueprint('apartments', __name__)
microsoft_login = Blueprint('microsoft_login', __name__)

SWISH_BASE_URL = "http://localhost:3005"

apartments_bp = Blueprint('apartments', __name__)

@apartments_bp.route("/api/paymentrequests", methods=['POST'])
def initiate_payment():
    json_data = request.get_json()
    response = requests.post(f"{SWISH_BASE_URL}/paymentrequests", json=json_data)
    return jsonify(response.json()), response.status_code

@apartments_bp.route("/api/payment-status/<request_id>", methods=['GET'])
def payment_status(request_id):
    response = requests.get(f"{SWISH_BASE_URL}/paymentrequests/{request_id}")
    return jsonify(response.json()), response.status_code


@microsoft_login.before_app_request
def register_oauth():
    tenant_id = current_app.config["MICROSOFT_TENANT_ID"]
    oauth.init_app(current_app)
    oauth.register(
        "microsoft",
        client_id=current_app.config["MICROSOFT_CLIENT_ID"],
        client_secret=current_app.config["MICROSOFT_CLIENT_SECRET"],
        authorize_url=f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/authorize",
        access_token_url=f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token",
        server_metadata_url=f"https://login.microsoftonline.com/{tenant_id}/v2.0/.well-known/openid-configuration",
        client_kwargs={"scope": "openid email profile "}, 

    )

@microsoft_login.route("/login")
def login():
    return oauth.microsoft.authorize_redirect(
        redirect_uri=url_for("microsoft_login.callback", _external=True)
        
    )

@apartments_bp.route("/mock-login", methods = ['POST', 'OPTIONS'])
def mock_login():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response

    json_data = request.get_json()
    
    session["user"] = json_data
    user = session.get("user")
    logging.info(user)
    email = user.get("email")
    
    if not handler.check_user(email):
        handler.add_user(json_data)

    response = jsonify({"message": "Mock user ok"})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

@microsoft_login.route("/callback")
def callback():
    token = oauth.microsoft.authorize_access_token()
    user = token.get("userinfo")

    session["user"] = {
        "id": user.get("sub"),
        "email": user.get("email"),
        "name": user.get("name")
    }

    json_data = session["user"]

    user = session.get("user")
    email = user.get("email")
    if not handler.check_user(email):
        handler.add_user(json_data)

    # Omdirigera användaren till hemskärmen efter lyckad inloggning
    return redirect("http://localhost:3000/")

@apartments_bp.route("/api/check-session", methods=["GET"])
def check_session():
    user = session.get("user")
    if user:
        return jsonify({"user": user})
    else:
        return jsonify({"user": None}), 401
    
@apartments_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    response = jsonify({"message": "Logged out"})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


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

# @apartments_bp.route('/login', methods = ['POST'])
# def login():
#     json_data = request.get_json()
#     return handler.login(json_data)

@apartments_bp.route("/api/add-apartment", methods=['POST'])
# @jwt_required()
def add_appartment():
    logging.info("addapt route ok")
    json_data = request.get_json()
    logging.info(json_data)
    # user_id = get_jwt_identity()
    # json_data['user_id'] = user_id
    return handler.add_apartment(json_data)

@apartments_bp.route("/api/get-user-profile", methods=['GET', 'OPTIONS'])
def get_user_profile():
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    elif request.method == 'GET':
        return handler.get_user_profile()


@apartments_bp.route("/api/get-user/<sso_id>", methods=['GET', 'PUT', 'POST'])
def get_user(sso_id):
    if request.method == 'OPTIONS':
        return _build_cors_preflight_response()
    
    elif request.method == 'GET':
        return handler.get_user(sso_id)
    # Denna route är för att uppdatera profilen
    elif request.method == 'PUT':
        json_data = request.get_json()
        return handler.update_user_profile(json_data)
    # Denna route är för att lägga till en review
    elif request.method == 'POST':
        json_data = request.get_json()
        logging.info('routes add review ok')
        return handler.add_review(sso_id, json_data)
        
    

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


@apartments_bp.route("/api/add-review", methods=['POST'])
@jwt_required()
def add_review():
    current_user = get_jwt_identity()
    json_data = request.get_json()
    return handler.add_review(current_user, json_data)




@apartments_bp.route("/api/get-review", methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def edit_review():
    json_data = request.get_json()

    if request.method == 'GET':
        return handler.get_review(json_data)
    elif request.method == 'PUT':
        return handler.edit_review(json_data)
    elif request.method == 'DELETE':
        return handler.delete_review(json_data)