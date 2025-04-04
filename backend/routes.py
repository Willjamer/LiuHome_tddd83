from flask import jsonify, request, Blueprint, current_app, session, redirect, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging
from authextension import get_auth

# OM STUB, KÖR DENNA: 
from request_handler_stub import courier

# OM VANLIG (databas), KÖR DENNA:
# from request_handler import courier

[1] INFO:werkzeug:127.0.0.1 - - [04/Apr/2025 14:14:57] "OPTIONS /api/get-apartments HTTP/1.1" 200 -
[1] INFO:werkzeug:127.0.0.1 - - [04/Apr/2025 14:14:57] "OPTIONS /api/get-apartments HTTP/1.1" 200 -
[1] INFO:root:routes get ok
[1] INFO:root:stub get ok
[1] INFO:werkzeug:127.0.0.1 - - [04/Apr/2025 14:14:57] "GET /api/get-apartments HTTP/1.1" 200 -
[1] INFO:root:routes get ok
[1] INFO:root:stub get ok
[1] INFO:werkzeug:127.0.0.1 - - [04/Apr/2025 14:14:57] "GET /api/get-apartments HTTP/1.1" 200 -
[1] INFO:werkzeug:127.0.0.1 - - [04/Apr/2025 14:15:11] "POST /logout HTTP/1.1" 405 -
^C[0] 
[0] next dev exited with code 0
[1] Exception ignored in: <function Popen.__del__ at 0x10a08fa60>
[1] Traceback (most recent call last):
[1]   File "/usr/local/Cellar/python@3.11/3.11.3/Frameworks/Python.framework/Versions/3.11/lib/python3.11/subprocess.py", line 1125, in __del__
[1]     _warn("subprocess %s is still running" % self.pid,
[1] KeyboardInterrupt: 
[1] Exception ignored in: <Finalize object, dead>
[1] Traceback (most recent call last):
[1]   File "/usr/local/Cellar/python@3.11/3.11.3/Frameworks/Python.framework/Versions/3.11/lib/python3.11/multiprocessing/util.py", line 224, in __call__
[1]     res = self._callback(*self._args, **self._kwargs)
[1]           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[1]   File "/usr/local/Cellar/python@3.11/3.11.3/Frameworks/Python.framework/Versions/3.11/lib/python3.11/multiprocessing/heap.py", line 282, in free
[1]     if not self._lock.acquire(False):

logging.basicConfig(level=logging.DEBUG)
handler = courier()

oauth = get_auth()
apartments_bp = Blueprint('apartments', __name__)
microsoft_login = Blueprint('microsoft_login', __name__)

@microsoft_login.before_app_request
def register_oauth():
    oauth.init_app(current_app)
    oauth.register(
        "microsoft",
        client_id=current_app.config["MICROSOFT_CLIENT_ID"],
        client_secret=current_app.config["MICROSOFT_CLIENT_SECRET"],
        authorize_url="https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        access_token_url="https://login.microsoftonline.com/common/oauth2/v2.0/token",
        client_kwargs={"scope": "openid email profile User.Read"},
    )

@microsoft_login.route("/login")
def login():
    return oauth.microsoft.authorize_redirect(
        redirect_uri=url_for("microsoft_login.callback", _external=True)
    )

@apartments_bp.route("/mock-login")
def mock_login():
    data = request.get_json()
    session["user"] = data.get("user")
    return {"message": "Mock user ok"}

@microsoft_login.route("/callback")
def callback():
    token = oauth.microsoft.authorize_access_token()
    user = oauth.microsoft.parse_id_token(token)

    headers = {"Authorization": f"Bearer {token['access_token']}"}
    graph_url = "https://graph.microsoft.com/v1.0/me"
    response = request.get(graph_url, headers = headers)
    user_data = response.json()
    
    session["user"] = user
    headers = {"Authorization: "}
    return f"Logged in as {user['name']}!"

@microsoft_login.route("/logout")
def logout():
    session.pop("user", None)
    return redirect("/")

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
