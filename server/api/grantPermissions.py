from flask import make_response,request
import json
from werkzeug.exceptions import HTTPException
from flask_restful import Resource, fields, marshal, marshal_with, reqparse
from application.model import User
from extensions.database import db
from flask_security import auth_required, login_required
from jwt_tokens.setup import token_required


class GrantPermissions(Resource):

      @token_required(role=[0])
      def put(self,user,current_user):
        if user.role_id == 0:
            if request.is_json:
                if 'email' in request.get_json():
                    email = request.get_json()["email"]
                    if 'role_id' in request.get_json():
                        try:
                            role_id = int(request.get_json()["role_id"])
                            user1 = User.query.filter_by(email=email).first();
                            user1.role_id = role_id
                            db.session.commit()
                            return make_response(json.dumps("Successfully Updated"),200)
                        except:
                            return make_response(json.dumps("Role_id must be an integer from 0 to 2"),400)
                    else:   
                        return make_response(json.dumps("Role_id is compulsory"),400)
                else:
                    return make_response(json.dumps("Email is compulsory."),400)
            else:
                 return make_response(json.dumps("The body must be of application/json."),400)    
        else:
            return make_response(json.dumps("You donot have permissions to do this update."),200)
            