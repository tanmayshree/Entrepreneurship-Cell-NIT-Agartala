from application.model import Testimonial
import json
from database.database_config import db
from flask_restful import Resource,fields,marshal,marshal_with,reqparse
from flask_security import auth_required
from flask import make_response

testimonial_api_resource_field_get = {
    'id': fields.Integer,
    'name': fields.String,
}

create_testimonial_parser = reqparse.RequestParser()
create_testimonial_parser.add_argument('name')
create_testimonial_parser.add_argument('pass_year')
create_testimonial_parser.add_argument('mobile_no')
create_testimonial_parser.add_argument('role_id')
create_testimonial_parser.add_argument('timestamp')

class TestimonialApi(Resource):

    def get(self,id): #GET
        pass

    def post(self): #POST
        parser = create_testimonial_parser.parse_args()
        name = parser.get('name',None)
        pass_year = parser.get('pass_year',None)
        mobile_no = parser.get('mobile_no',None)
        role_id = parser.get('role_id',None)
        timestamp = parser.get('timestamp',None)
        test = Testimonial(name = name, pass_year = pass_year, mobile_no = mobile_no, role_id=role_id, timestamp=timestamp)
        db.session.add(test)
        db.session.commit()
        return make_response(json.dumps("Successfully Added"),200)

    def put(self,id): #PUT
        pass