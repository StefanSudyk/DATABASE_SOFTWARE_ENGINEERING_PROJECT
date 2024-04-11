from server import db
from flask_login import UserMixin
from sqlalchemy.sql import func

# TODO: określić architekture bd

class User(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String(80))
    surname = db.Column(db.String(80))
    phone_number = db.Column(db.String(9))


    def __init__(self, name, surname, phone_number):
        self.name = name
        self.surname = surname
        self.phone_number = phone_number


