from authlib.integrations.flask_client import OAuth
# from flask import current_app
def get_auth():
    oauth = OAuth()
    return oauth