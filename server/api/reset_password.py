import json
from flask_restful import Resource,fields,marshal,marshal_with,reqparse
from flask import make_response,jsonify
from application.model import User
import jwt
from datetime import datetime,timedelta
from flask_security.utils import verify_password
from extensions.app import app
from overridden.register import register
from flask import after_this_request, request,make_response
from flask_security.confirmable import (
    confirm_email_token_status,
    confirm_user,
    send_confirmation_instructions,
)
from flask_security.recoverable import (
    reset_password_token_status,
    generate_reset_password_token,
    update_password,
)
from flask_security.proxies import _security
from werkzeug.datastructures import  MultiDict
from flask import after_this_request
from flask_security.utils import suppress_form_csrf,view_commit,config_value,send_mail


# ---- This is a modified form of the function available at flask_security.recoverable
def send_reset_password_instructions(user):
    """Sends the reset password instructions email for the specified user.

    :param user: The user to send the instructions to
    """
    token = generate_reset_password_token(user)

    if config_value("SEND_PASSWORD_RESET_EMAIL"):
        send_mail(
            config_value("EMAIL_SUBJECT_PASSWORD_RESET"),
            user.email,
            "reset_instructions",
            user=user,
            reset_token=token,
        )

# -------------- Reset Password API -------------- #
class ResetPassword(Resource):
    '''
    An api class to Reset Password using flask security.\n
    No parameters required.\n
    No authentication required.\n
    '''
    #### If user has not confirmed his email, he cannot change password. Implement this case.
    def post(self):
        if request.is_json:
            if 'reset_token' in request.headers:
                token = request.headers["reset_token"]
                expired, invalid, user = reset_password_token_status(token)
                print(expired, invalid, user)
                if user is None or invalid or expired:
                    return make_response(json.dumps("Inappropriate attempt to reset password!!! \nMay be the time limit has expired or this link has already been used."),400)  
                else:
                    form_class = _security.reset_password_form
                    form = form_class(MultiDict(request.get_json()), meta=suppress_form_csrf())
                    form.user = user 
                    if form.validate_on_submit():
                        after_this_request(view_commit)
                        update_password(user, form.password.data)
                        return make_response(json.dumps("Successfully Updated. Please Login now"),200) 
                    else:
                        return make_response(json.dumps("Missing details."),400)
            else:
                if 'email' in request.get_json():
                    email = request.get_json()['email']
                    if email:
                        user = User.query.filter_by(email=email).first()
                        if user:
                            send_reset_password_instructions(user)
                            return make_response(json.dumps("Password reset email sent."),200)  
                        else:
                            return make_response(json.dumps("User with specified email doesnot exists."),400) 
                    else:
                        return make_response(json.dumps("Email is compulsory."),400)
                else:
                    return make_response(json.dumps("Email is compulsory."),400)
        else:
            return make_response(json.dumps("The body must be of application/json."),400)    


        
        

        
