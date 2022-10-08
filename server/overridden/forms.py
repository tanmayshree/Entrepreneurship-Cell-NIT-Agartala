from flask_security import RegisterForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired

class ExtendedRegisterForm(RegisterForm):
    name = StringField('name',[DataRequired()])
    pass_year = IntegerField('pass_year')
    timestamp = StringField('timestamp')
    organisation = StringField('organisation',[DataRequired()])