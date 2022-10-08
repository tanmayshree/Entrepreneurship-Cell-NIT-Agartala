from flask import make_response
import json
from werkzeug.exceptions import HTTPException
from flask_restful import Resource, fields, marshal, marshal_with, reqparse
from application.model import User
from extensions.database import db
from flask_security import auth_required, login_required

from jwt_tokens.setup import token_required

user_api_resource_field_get = {
    'id' : fields.Integer,
    'email' :fields.String,
    'name' : fields.String,
    'mobile_no' : fields.Integer
}

class Error(HTTPException):
    def __init__(self, status_code, error_msg, error_code):
        message = {
            'error_code' :error_code,
            'error_message' : error_msg
        }
        self.response = make_response(json.dumps(message), status_code, {"Content-Type":"application/json"})

create_user_details_parser = reqparse.RequestParser()
create_user_details_parser.add_argument('name')
create_user_details_parser.add_argument('mobile_no')
create_user_details_parser.add_argument('pass_year')
create_user_details_parser.add_argument('user_email')
create_user_details_parser.add_argument('organisation')

class UserApi(Resource):
    
    
    @token_required()
    def delete(self, user,current_user):  # TO DELETE DATA
        user = User.query.filter_by(email = user.email).first()
        if(user == None):
            raise Error(404, "Account doesn't exists.", "UDE")
        else:
            db.session.delete(user)
            db.session.commit()
        return make_response(json.dumps("Successfully Deleted"), 200)