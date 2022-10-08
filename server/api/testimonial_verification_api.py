import json
from flask_restful import Resource, reqparse
from flask import make_response
from application.model import Testimonial
from datetime import datetime
from extensions.database import db
from jwt_tokens.setup import token_required

create_testimonial_status_parser = reqparse.RequestParser()
create_testimonial_status_parser.add_argument('validation_status');
create_testimonial_status_parser.add_argument('id');

class VerifyTestimonialsApi(Resource):
      @token_required(role=[0,1])
      def get(self, user, current_user):
            testimonials = Testimonial.query.filter_by(validation_status=0).all()
            if(testimonials == None):
                  return make_response(json.dumps("No pending testimonials."),200)
            else:
                  testimonials_list = []
                  # print(testimonials)
                  for i in testimonials:
                        # print(i.user.user_detail[0].name)
                        # print(i)
                        data = {
                              "id" : i.id,
                              "feedback" : i.feedback,
                              "timestamp" : str(datetime.strftime(datetime.strptime(i.timestamp[:10],"%Y-%m-%d"),"%d-%m-%Y")),
                              "email":i.user_email,
                              "name": i.user.user_detail[0].name,
                              "organisation": i.user.user_detail[0].organisation
                        }
                        testimonials_list.append(data)
                  return make_response(json.dumps(testimonials_list),200)

      #ADD ROLE BASED AUTHENTICATION BELOW
      @token_required(role=[0,1])
      def put(self,user,current_user):
            parser = create_testimonial_status_parser.parse_args()
            validation_status = int(parser.get('validation_status', 0))
            print(type(validation_status))
            id = int(parser.get('id', None))
            print(id)
            testimonial = Testimonial.query.filter_by(id=id).first()
            print(testimonial)
            if(testimonial == None):
                  return make_response(json.dumps("Testimonial not found."),400)
            else:
                  print(validation_status==1)
                  if(testimonial.validation_status==0 and validation_status in [1,2]):
                        testimonial.validation_status=validation_status
                  else:
                        return make_response(json.dumps("Validation status remains unchanged."),400)
            db.session.commit()
            return make_response(json.dumps("Validation Status Updated Successfully."),200)