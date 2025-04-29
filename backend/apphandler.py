from flask import Flask
from flask_cors import CORS
from extensions import db, bcrypt, jwt
from routes import apartments_bp, microsoft_login
# from auth import oauth, microsoft_login
from authextension import get_auth
app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://neondb_owner:npg_LK8b5tZIUSeX@ep-mute-block-ab13wto4-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"

app.config['JWT_SECRET_KEY'] = "[1] INFO:werkzeug:WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead."

app.config["SECRET_KEY"] = "my_temp_key_which_should_be_longer"
app.config["MICROSOFT_CLIENT_ID"] = "0b0f8650-fca0-47a0-8887-939b62c27038"
app.config["MICROSOFT_CLIENT_SECRET"] = "z5k8Q~S4dQsNnN_5ycGFczGe-HJy0vx-U5H2VbDi"
app.config["MICROSOFT_TENANT_ID"] = "913f18ec-7f26-4c5f-a816-784fe9a58edd"
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True

oauth = get_auth()

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
CORS(app, origins=["http://localhost:3000"], supports_credentials = True) 
app.register_blueprint(apartments_bp)
app.register_blueprint(microsoft_login)

# oauth.init_app(app)
def get_app():
    return app

def get_bcrypt():
    return bcrypt

def get_db():
    return db

def get_jwt():
    return jwt

if __name__ == "__main__":
    app.run(debug=True, port = 3001)
