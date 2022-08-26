from api.testimonial_api import *
from api.user_api import *
from flask import Flask, render_template, redirect
from api.user_validation_api import UserValidationApi
from application.config import *
from application.model import *
from flask_restful import Api
from flask_security import Security, SQLAlchemySessionUserDatastore
from database.database_config import db
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    api = Api(app)
    CORS(app)
    user_datastore = SQLAlchemySessionUserDatastore(db.session, User, Role)
    security = Security(app, user_datastore)
    app.app_context().push()
    return (app,api)

app,api = create_app()

@app.route("/")
def home():
    return render_template("index.html")

api.add_resource(UserApi,"/api/user/get/<string:email>","/api/add_feedback","/api/user/delete/<string:email>")

api.add_resource(TestimonialApi,"/api/add_user_feedback")

api.add_resource(UserValidationApi, "/api/user-validation")

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



if __name__ == "__main__":
    app.run(debug = True)


    