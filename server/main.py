# ---------- IMPORTING THE REQUIRED MODULES ----------#
import os
from flask import render_template
from flask_security import Security, SQLAlchemyUserDatastore
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_restful import Api
from extensions.app import app
from extensions.database import db
from application.config import LocalDevelopmentConfig,ProductionConfig
from application.model import User,Role
from overridden.forms import ExtendedRegisterForm
from extensions.mail import mail

# ---------- CREATING THE FLASK APP INSTANCE ----------#
def create_app():
    
    ##### Configuring the app #####
    if(os.getenv("ENV","development")=="production"):
        app.config.from_object(ProductionConfig) # Configures the ProductionConfig data with the app
    else:
        print("----- Starting the local development -----")
        app.config.from_object(LocalDevelopmentConfig) # Configures the LocalDevelopmentConfig data with the app

    ##### Initialising the app with the database instance #####
    db.init_app(app)

    ##### Initialising the app with the restful api instance #####
    api=Api(app)

    ##### Initialising the app with the Bcrypt #####
    Bcrypt(app)

    ##### Initialising the app with the CORS #####
    CORS(app)

    ##### Initialising the app with the Security #####
    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    security = Security(app, user_datastore,register_form=ExtendedRegisterForm)

    ##### Initialising the app with the mail instance #####
    mail.init_app(app)
    app.extensions['mail'].debug = 0
    
    ##### Push the app context on the app stack #####
    app.app_context().push()
    return app,api,db,mail,security

app,api,db,mail,security=create_app()

# @app.endpoint(security.blueprint_name + '.reset_passowrd')
# def reset_password(token)

# -------------- Error handler for undefined endpoints --------------- #
@app.errorhandler(404)
def pageNotFound(e):
    return render_template("pageNotFound.html")

# -------------- Setting the API endpoints --------------- #
from api.admin_validation_api import AdminValidationApi
from api.testimonial_display_api import DisplayTestimonialsApi
from api.testimonial_verification_api import VerifyTestimonialsApi
from api.user_testimonial_api import *
from api.admin_api import *
from api.user_details_api import *
from api.user_validation_api import UserValidationApi
from api.user_authentication import Login,RegisterUser

api.add_resource(UserApi,"/api/user/getUserDetails","/api/user/delete","/api/register/userDetails")
api.add_resource(TestimonialApi,"/api/addUserTestimonial","/api/get/userDashboard")
api.add_resource(DisplayTestimonialsApi, "/api/getApprovedTestimonials")
api.add_resource(UserValidationApi, "/api/userValidation")
api.add_resource(AdminValidationApi, "/api/adminValidation")
api.add_resource(VerifyTestimonialsApi, "/api/admin/getPendingTestimonials", "/api/updateTestimonialValidationStatus")
api.add_resource(Login, "/api/login")
api.add_resource(RegisterUser, "/api/register")



# ---------- RUNNING THE APP ON DEVELOPMENT SERVER ----------#
if __name__ == "__main__":
    app.run()


    