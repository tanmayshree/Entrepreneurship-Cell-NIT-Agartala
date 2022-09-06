import json
from flask_restful import Resource
from flask import make_response
from application.model import Testimonial
from datetime import datetime




class DisplayTestimonialsApi(Resource):
      def get(self):
            testimonials = Testimonial.query.filter_by(validation_status=1).all()
            if(testimonials == None):
                  return make_response(json.dumps("No testimonial exists."),200)
            else:
                  testimonials_list = []
                  for i in testimonials:
                        data = {
                              "feedback" : i.feedback,
                              "timestamp" : str(datetime.strftime(datetime.strptime(i.timestamp[:10],"%Y-%m-%d"),"%d-%m-%Y")),
                              "name": i.user.user_detail[0].name
                        }
                        testimonials_list.append(data)
                  return make_response(json.dumps(testimonials_list),200)