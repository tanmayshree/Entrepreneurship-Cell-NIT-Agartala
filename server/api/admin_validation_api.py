from flask import make_response
import json
from werkzeug.exceptions import HTTPException
from flask_restful import Resource, fields, marshal, marshal_with, reqparse
from application.model import User
from extensions.database import db
from flask_security import auth_required, login_required
from jwt_tokens.setup import token_required


class AdminValidationApi(Resource):

      @token_required(role=[0,1])
      def get(self,user,current_user):
            return make_response(json.dumps("Validated successfully."),200)