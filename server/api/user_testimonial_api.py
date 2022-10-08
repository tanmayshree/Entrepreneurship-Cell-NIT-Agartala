from flask import make_response
import json
from werkzeug.exceptions import HTTPException
from flask_restful import Resource, fields, marshal, marshal_with, reqparse
from application.model import Testimonial
from extensions.database import db
from flask_security import auth_required, login_required
from flask_login import current_user
from datetime import datetime

from jwt_tokens.setup import token_required

# testimonial_api_resource_field_get = {
#       'id' : fields.Integer,
#       'feedback' : fields.String,
#       'validation-status' : fields.Boolean,
# }

create_testimonial_details_parser = reqparse.RequestParser()
create_testimonial_details_parser.add_argument('feedback');
create_testimonial_details_parser.add_argument('user_email');

class Error(HTTPException):
    def __init__(self, status_code, error_msg, error_code):
        message = {
            'error_code' :error_code,
            'error_message' : error_msg
        }
        self.response = make_response(json.dumps(message), status_code, {"Content-Type":"application/json"})

class TestimonialApi(Resource):
    @token_required()
    def post(self,user,current_user):
        parser = create_testimonial_details_parser.parse_args()
        feedback = parser.get('feedback', None)
        timestamp = str(datetime.now())[0:19]
        user_detail = Testimonial(feedback = feedback, validation_status = 0, user_email = user.email, timestamp = timestamp)
        db.session.add(user_detail)
        db.session.commit()
        return make_response(json.dumps("Feedback submitted successfully."),200)
    
    @token_required()
    def get(self,user,current_user):
        testimonial = Testimonial.query.filter_by(user_email = user.email).all()
        if(testimonial == None):
            raise Error(404, "Testimonial doesn't exists.", "UDE")
        else:
            testimonial_list = []
            for i in testimonial:
                data = {
                    "feedback" : i.feedback,
                    "validation_status" : i.validation_status,
                    "timestamp" : i.timestamp
                }
                if data["validation_status"]==0:
                    data["validation_status"]="Pending"
                elif data["validation_status"]==1:
                    data["validation_status"]="Accepted"
                elif data["validation_status"]==2:
                    data["validation_status"]="Rejected"
                testimonial_list.append(data)
            return make_response(json.dumps(testimonial_list),200)