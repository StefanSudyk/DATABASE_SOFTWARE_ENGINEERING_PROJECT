from app import db
from flask_login import UserMixin
from sqlalchemy.sql import func

# TODO: określić architekture bd

class User(db.Model):
    id_user = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String(20))
    surname = db.Column(db.String(20))
    phone_number = db.Column(db.String(9))
    password = db.Column(db.String(20))
    properties = db.relationship('Property', backref='owner', lazy=True)

    def __init__(self, id_user, name, surname, phone_number, password):
        self.id_user = id_user
        self.name = name
        self.surname = surname
        self.phone_number = phone_number
        self.password = password


class Property(db.Model):
    id_property = db.Column(db.Integer, unique=True, primary_key=True)
    id_owner = db.Column(db.Integer, db.ForeignKey('user.id_user')) 
    title = db.Column(db.String(100))
    #IDK czy tak z ta cena ale dalem ze do 2 dokladnosc miejsc
    price = db.Column(db.Float(precision = 2))
    square_footage = db.Column(db.Float)
    surroundings = db.Column(db.String(20))
    finishing_standard = db.Column(db.String(20))
    condition = db.Column(db.String(30))
    market = db.Column(db.String(20))
    address = db.relationship('Address', uselist=False, backref='property', lazy=True) #uselist=false do relacji jeden do jednego
    inside = db.relationship('Inside', uselist=False, backref='property', lazy=True)

    def __init__(self, id_property, id_owner, title, price, square_footage, surroundings, finishing_standard, condition, market):
        self.id_property = id_property
        self.id_owner = id_owner
        self.title = title
        self.price = price
        self.square_footage = square_footage
        self.surroundings = surroundings
        self.finishing_standard = finishing_standard
        self.condition = condition
        self.market = market


class Address(db.Model):
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'), primary_key=True)
    province = db.Column(db.String(30))
    county = db.Column(db.String(100))
    district = db.Column(db.String(100))
    locality = db.Column(db.String(100))
    street = db.Column(db.String(100))
    zip_code = db.Column(db.String(20))
    coordinates= db.Column(db.Integer)
    
    def __init__(self, id_property, province, county, district, locality, street, zip_code, coordinates):
        self.id_property = id_property
        self.province = province
        self.county = county
        self.district = district
        self.locality = locality
        self.street = street
        self.zip_code = zip_code
        self.coordinates = coordinates

class Inside(db.Model):
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'), primary_key=True)
    nr_rooms = db.Column(db.Integer)
    nr_bathrooms = db.Column(db.Integer)
    nr_garages = db.Column(db.Integer)
    nr_balconies = db.Column(db.Integer)
    nr_floors = db.Column(db.Integer)
    type_of_heating = db.Column(db.String(30))
    description = db.Column(db.String(500))

    def __init__(self, id_property, nr_rooms, nr_bathrooms, nr_garages, nr_balconies, nr_floors, type_of_heating, description):
        self.id_property = id_property
        self.nr_rooms = nr_rooms
        self.nr_bathrooms = nr_bathrooms
        self.nr_garages = nr_garages
        self.nr_balconies = nr_balconies
        self.nr_floors = nr_floors
        self.type_of_heating = type_of_heating
        self.description = description
