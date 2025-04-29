from flask import Flask
from flask_cors import CORS
from extensions import db, bcrypt, jwt
from routes import apartments_bp

app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://neondb_owner:npg_LK8b5tZIUSeX@ep-mute-block-ab13wto4-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"

app.config['JWT_SECRET_KEY'] = "[1] INFO:werkzeug:WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead."
db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
CORS(app, origins=["http://localhost:3000"], supports_credentials = True) 
app.register_blueprint(apartments_bp)


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
