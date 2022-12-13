# -------------- IMPORTING THE REQUIRED MODULES --------------- #
import os

# -------------- PATH OF BASE DIRECTORY --------------- #
basedir = os.path.abspath(os.path.dirname(__file__)) # path of the base directory

class Config():
    DEBUG = False
    WTF_CSRF_ENABLED = False
    SECURITY_UNAUTHORIZED_VIEW = None
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class LocalDevelopmentConfig(Config):

    ##### Development config #####
    DEBUG = True

    ##### Flask SQLAlchemy / Database Config #####
    SQLITE_DB_DIR = os.path.join(basedir, '../database')
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(SQLITE_DB_DIR, "Development.sqlite3")

    ##### Flask Security Config #####
    SECRET_KEY = os.getenv('SECRET_KEY')
    SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT')
    SECURITY_PASSWORD_HASH = os.getenv('SECURITY_PASSWORD_HASH')

    SECURITY_REGISTERABLE = False # /register endpoint will not be available
    SECURITY_SEND_REGISTER_EMAIL = True 

    SECURITY_CONFIRMABLE = True
    SECURITY_CONFIRM_EMAIL_WITHIN = '1 days'
    SECURITY_AUTO_LOGIN_AFTER_CONFIRM = False
    SECURITY_POST_CONFIRM_VIEW = 'http://localhost:3000/' # the url to redirect after confirming

    SECURITY_RECOVERABLE = False # We dont need the /reset endpoint provided by flask security as it is implemented manually.
    SECURITY_RESET_PASSWORD_WITHIN = "5 minutes"

    ##### Flask Mail Config #####
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT')
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD') 


class ProductionConfig(Config):

    ##### Flask SQLAlchemy / Database Config #####
    SQLITE_DB_DIR = os.path.join(basedir, '../database')
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(SQLITE_DB_DIR, "Production.sqlite3")

    ##### Flask Security Config #####
    SECRET_KEY = os.getenv('SECRET_KEY')
    SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT')
    SECURITY_PASSWORD_HASH = os.getenv('SECURITY_PASSWORD_HASH')

    SECURITY_REGISTERABLE = False # /register endpoint will not be available
    SECURITY_SEND_REGISTER_EMAIL = True 

    SECURITY_CONFIRMABLE = True
    SECURITY_CONFIRM_EMAIL_WITHIN = '1 hours'
    SECURITY_AUTO_LOGIN_AFTER_CONFIRM = False
    SECURITY_POST_CONFIRM_VIEW = 'http://localhost:3000/' # the url to redirect after confirming

    SECURITY_RECOVERABLE = False # We dont need the /reset endpoint provided by flask security as it is implemented manually.
    SECURITY_RESET_PASSWORD_WITHIN = "5 minutes"

    ##### Flask Mail Config #####
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT')
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD') 
