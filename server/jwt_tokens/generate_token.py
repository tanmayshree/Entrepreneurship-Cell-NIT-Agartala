import jwt
from extensions.app import app
from datetime import datetime,timedelta

def generate_jwt_token(user,role_id=2):
    jwt_token = jwt.encode({
                'public_id': user.id,
                'role_id' : role_id,
                'exp' : datetime.utcnow() + timedelta(minutes = 30)
                }, app.config['SECRET_KEY'])
    return jwt_token