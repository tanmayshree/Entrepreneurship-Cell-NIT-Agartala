from api.testimonial_display_api import DisplayTestimonialsApi
from api.user_testimonial_api import *
from api.admin_api import *
from api.user_details_api import *
from flask import Flask, render_template, redirect
from api.user_validation_api import UserValidationApi
from api.user_authentication import Login
from application.config import *
from application.model import *
from flask_restful import Api
from flask_security import Security, SQLAlchemySessionUserDatastore
from database.database_config import db
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = None
def create_app():
    app = Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    api = Api(app)
    bcrypt = Bcrypt(app)
    CORS(app)
    user_datastore = SQLAlchemySessionUserDatastore(db.session, User, Role)
    security = Security(app, user_datastore)
    app.app_context().push()
    return (app,api)

app,api = create_app()

@app.route("/")
def home():
    return render_template("index.html")


api.add_resource(UserApi,"/api/user/getUserDetails","/api/user/delete","/api/register/userDetails")

api.add_resource(TestimonialApi,"/api/addUserTestimonial","/api/get/userDashboard")

api.add_resource(DisplayTestimonialsApi, "/api/getApprovedTestimonials")
api.add_resource(UserValidationApi, "/api/userValidation")
api.add_resource(AdminApi, "/api/admin/getPendingTestimonials")
api.add_resource(Login, "/api/login")
# @app.route("/view/<int:id>")
# def view(id):
#     tes=Testimonial.query.filter_by(id=id).first()
#     return render_template("test.html", tes=tes)

# @app.route("/add")
# def test():
#     tes=Testimonial(email="abc4.", name = "Tanmay", pass_year=2024, mobile_no=78945612130, feedback="hii")
#     db.session.add(tes)
#     db.session.commit()
#     return render_template("test.html", tes=tes)



# if __name__ == "__main__":
#     app.run(debug = True)


    