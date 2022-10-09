import os
from datetime import datetime,timedelta

class Config():
    DEBUG = False
    WTF_CSRF_ENABLED = False
    SECURITY_UNAUTHORIZED_VIEW = None
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class LocalDevelopmentConfig(Config):

    ##### Development config #####
    DEBUG= True

    ##### Flask Security Config #####
    SECRET_KEY = os.getenv('SECRET_KEY')
    SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT')
    SECURITY_PASSWORD_HASH = os.getenv('SECURITY_PASSWORD_HASH')

    SECURITY_REGISTERABLE = False # /register endpoint will not be available
    SECURITY_SEND_REGISTER_EMAIL = True 

    SECURITY_CONFIRMABLE = True
    SECURITY_CONFIRM_EMAIL_WITHIN = '1 days'
    SECURITY_AUTO_LOGIN_AFTER_CONFIRM = False
    SECURITY_POST_CONFIRM_VIEW = 'https://www.google.com/' # the url to redirect after confirming

    SECURITY_RECOVERABLE = True
    SECURITY_POST_RESET_VIEW = 'https://www.google.com/' # the url to redirect after reseting

    ##### Flask SQLAlchemy Config #####
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')

    ##### Flask Mail Config #####
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT')
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD') 


class ProductionConfig(Config):

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

    SECURITY_RECOVERABLE = True
    SECURITY_RESET_PASSWORD_WITHIN = "5 minutes"

    ##### Flask SQLAlchemy Config #####
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')

    ##### Flask Mail Config #####
    MAIL_SERVER = os.getenv('MAIL_SERVER')
    MAIL_PORT = os.getenv('MAIL_PORT')
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD') 



# btywvosbjtniyubd
