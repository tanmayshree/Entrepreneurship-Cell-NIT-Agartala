import jwt
from functools import wraps
from flask import request
from flask import make_response
import json
from application.model import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        
        token = None
        # jwt is passed in the request header
        if 'jwt_token' in request.headers:
            token = request.headers['jwt_token']
        # return 401 if token is not passed
        if not token:
            return make_response(json.dumps('Token is missing !!!'),401)
        try:
            # decoding the payload to fetch the stored details
            # data = jwt.decode(token, app.config['SECRET_KEY'])
            user = jwt.decode(token, "gibwaeilfvhnikfvhn468468784vr497drv9874v6sdrvdrv",algorithms=["HS256"])
            current_user = User.query.filter_by(id = user['public_id']).first()
        except jwt.ExpiredSignatureError:
            return make_response(json.dumps("Invalid Token."),400)
        # returns the current logged in users contex to the routes
        return  f(user,current_user, *args, **kwargs)
    return decorated
