from extensions.database import db
from flask_security import UserMixin, RoleMixin

class Roles_Users(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))


class User(db.Model,UserMixin):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key = True, autoincrement= True)
    email = db.Column(db.String, unique = True)
    name = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    pass_year = db.Column(db.Integer)
    timestamp = db.Column(db.String)
    organisation = db.Column(db.String, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey("role.id"), nullable=False, default = 2) #0:Super-Admin, 1:Secondary-Admin, 2:End-Users

    active = db.Column(db.Boolean, nullable = False)
    fs_uniquifier = db.Column(db.String, unique = True, nullable = False)
    confirmed_at = db.Column(db.String())
    
    roles = db.relationship('Role', backref="users", cascade='all,delete', secondary = 'roles_users')
    testimonials = db.relationship('Testimonial',backref='user',cascade="all,delete")


class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, unique = True)
    description = db.Column(db.String)


class Testimonial(db.Model):
    __tablename__ = 'testimonial'
    id = db.Column(db.Integer, primary_key= True, autoincrement = True)
    timestamp = db.Column(db.String)
    feedback = db.Column(db.String, nullable = False)
    validation_status = db.Column(db.Integer, nullable = False, default = 0) # 0:Pending, 1:Accepted, 2:Rejected
    user_email = db.Column(db.String, db.ForeignKey('user.email'), nullable=False)
    