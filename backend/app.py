from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import routes

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config['JWT_SECRET_KEY'] = "Kursen TDDD83 är en av de i särklass sämsta kurserna jag har läst i mitt liv och det är liksom inte ens kul hur den bara blir sämre och sämre"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, origins=["http://localhost:3000"])  # Allow requests from the frontend

def get_bcrypt():
    return bcrypt

def get_db():
    return db

def get_jwt():
    return jwt


if __name__ == "__main__":
    app.run(debug=True, port = 3000)