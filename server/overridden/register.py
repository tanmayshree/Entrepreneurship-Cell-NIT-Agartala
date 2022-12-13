from flask import after_this_request, request,make_response
import json
from werkzeug.datastructures import ImmutableMultiDict
from flask_security.decorators import anonymous_user_required
from flask_security.proxies import _security
from flask_security.registerable import register_user
from flask_security.utils import base_render_json, suppress_form_csrf, view_commit
from flask.typing import ResponseValue

@anonymous_user_required
def register() -> "ResponseValue":
    """Function which handles a registration request."""

    form_class = _security.register_form

    if request.is_json:
        form_data: ImmutableMultiDict = ImmutableMultiDict(request.get_json())
    else:
        return make_response(json.dumps("The body must be of application/json."),400)  
        
    User=None
    form = form_class(form_data, meta=suppress_form_csrf())
    if form.validate_on_submit(): # Checks for valid form details
        after_this_request(view_commit)
        User = register_user(form)
        form.user = User
    return base_render_json(form)
