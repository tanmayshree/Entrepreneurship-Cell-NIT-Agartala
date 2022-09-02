from flask import make_response
import json
from flask_restful import Resource, fields, marshal, marshal_with, reqparse
from application.model import Testimonial
from database.database_config import db
from flask_security import auth_required, login_required

class AdminApi(Resource):

      # @auth_required('token')
      def get(self):
            testimonial = Testimonial.query.filter_by(validation_status = 0).all()
            if(testimonial == None):
                  return make_response(json.dumps("No Pending Testimonials."),200)
            else:
                  testimonial_list = []
                  for i in testimonial:
                        data = {
                              "feedback" : i.feedback,
                              "validation_status" : i.validation_status,
                              "email":i.user_email,
                              "name":i.user.user_detail[0].name,
                              "organisation":i.user.user_detail[0].organisation
                        }
                        # print(i.user.user_detail.name)
                        testimonial_list.append(data)
                  return make_response(json.dumps(testimonial_list),200)