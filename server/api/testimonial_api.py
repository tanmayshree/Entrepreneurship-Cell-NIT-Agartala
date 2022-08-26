from flask import make_response
import json
from werkzeug.exceptions import HTTPException
from flask_restful import Resource, fields, marshal, marshal_with, reqparse
from application.model import Testimonial
from database.database_config import db
from flask_security import auth_required, login_required
from flask_login import current_user

from server.application.model import Testimonial

testimonial_api_resource_field_get = {
      'id' : fields.Integer,
      'feedback' : fields.String,
      'validation-status' : fields.Boolean,
}

create_testimonial_details_parser = reqparse.RequestParser()
create_testimonial_details_parser.add_argument('feedback');
create_testimonial_details_parser.add_argument('validation_status');
create_testimonial_details_parser.add_argument('user_email');

class Error(HTTPException):
    def __init__(self, status_code, error_msg, error_code):
        message = {
            'error_code' :error_code,
            'error_message' : error_msg
        }
        self.response = make_response(json.dumps(message), status_code, {"Content-Type":"application/json"})

class TestimonialApi(Resource):
      @auth_required('token')
      def post(self):
            # print(current_user.email)
            parser = create_testimonial_details_parser.parse_args()
            feedback = parser.get('feedback', None)
            user_detail = Testimonial(feedback = feedback, validation_status = False, user_email = current_user.email)
            db.session.add(user_detail)
            db.session.commit()
            return make_response(json.dumps("Feedback submitted successfully."),200)
