from authlib.integrations.flask_client import OAuth

def get_auth():
    oauth = OAuth()

    return oauth