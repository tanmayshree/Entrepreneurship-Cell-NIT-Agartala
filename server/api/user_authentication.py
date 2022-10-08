import json
from flask_restful import Resource,fields,marshal,marshal_with,reqparse
from flask import make_response,jsonify
from application.model import User
import jwt
from datetime import datetime,timedelta
from flask_security.utils import verify_password
from extensions.app import app
from overridden.register import register


# -------------- Register API -------------- #
class RegisterUser(Resource):
    '''
    An api class to register user using flask security.\n
    No parameters required.\n
    No authentication required.\n
    '''

    def post(self):
        response = register()
        return response



create_login_parser = reqparse.RequestParser()
create_login_parser.add_argument('email')
create_login_parser.add_argument('password')

class Login(Resource):
      def post(self):
            parser = create_login_parser.parse_args()
            email = parser.get('email',None)
            password = parser.get('password',None)

            if(email is not None and password is not None):
                  user = User.query.filter_by(email=email).first()
                  if user is not None:
                        if verify_password(password,user.password):
                              jwt_token = jwt.encode({
                                    'public_id': user.id,
                                    'role_id' : user.user_detail[0].role_id,
                                    'exp' : datetime.utcnow() + timedelta(minutes = 30)
                                    }, app.config['SECRET_KEY'])
                              return jsonify({'jwt_token' : jwt_token, 'role_id' : user.user_detail[0].role_id})
                        else:
                             return make_response(json.dumps("Invalid Password."),400)  
                  else:
                       return make_response(json.dumps("User doesnot exist."),400) 
            else:
                  return make_response(json.dumps("Missing Details"),400)
                  
