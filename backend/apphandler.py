from flask import Flask
from flask_cors import CORS
from extensions import db, bcrypt, jwt
from routes import apartments_bp, microsoft_login
# from auth import oauth, microsoft_login

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config['JWT_SECRET_KEY'] = "Kursen TDDD83 är en av de i särklass sämsta kurserna jag har läst i mitt liv och det är liksom inte ens kul hur den bara blir sämre och sämre"

app.config["SECRET_KEY"] = "my_temp_key_which_should_be_longer"
app.config["MICROSOFT_CLIENT_ID"] = "my_temp_id"
app.config["MICROSOFT_CLIENT_SECRET"] = "my_temp_secret"

# oauth = oauth()

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
CORS(app, origins=["http://localhost:3000"]) 
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