# ---------- IMPORTING THE REQUIRED MODULES ----------#
import os
from flask_security import Security, SQLAlchemyUserDatastore
from flask_cors import CORS
from flask_bcrypt import Bcrypt

from extensions.app import app
from extensions.database import db
from extensions.api import api
from application.config import LocalDevelopmentConfig,ProductionConfig
from application.model import User,Role



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
    api.init_app(app)

    ##### Initialising the app with the Bcrypt #####
    Bcrypt(app)

    ##### Initialising the app with the CORS #####
    CORS(app)

    ##### Initialising the app with the Security #####
    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    Security(app, user_datastore)

    ##### Push the app context on the app stack #####
    app.app_context().push()
    return app,api,db


app,api,db=create_app()

# from api.api_uri import *
# from api.user_authentication import Login
# api.add_resource(Login, "/api/login")

# ---------- RUNNING THE APP ON DEVELOPMENT SERVER ----------#
if __name__ == "__main__":
    app.run()


    