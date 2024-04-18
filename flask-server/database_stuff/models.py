from app import db
from flask_login import UserMixin
from sqlalchemy.sql import func

# TODO: określić architekture bd

class User(db.Model):
    id_user = db.Column(db.Integer, unique=True, primary_key=True)
    id_company = db.Column(db.Integer)
    name = db.Column(db.String(20))
    surname = db.Column(db.String(20))
    phone_number = db.Column(db.String(9))
    password = db.Column(db.String(20))
    email = db.Column(db.String(50))
    type = db.Column(db.String(50))
    properties = db.relationship('Property', backref='owner', lazy=True)

    def __init__(self, id_user,id_company, name, surname, phone_number, password,email, type):
        self.id_user = id_user
        self.id_company = id_company
        self.name = name
        self.surname = surname
        self.phone_number = phone_number
        self.password = password
        self.email = password
        self.type = type

class Favourite(db.Model):
    id_favourite = db.Column(db.Integer, unique=True, primary_key=True)
    id_user = db.Column(db.Integer)
    id_property = db.Column(db.Integer)

    def __init__(self, id_favourite, id_user, id_property):
        self.id_favourite = id_favourite
        self.id_user = id_user
        self.id_property = id_favourite
class Company(db.Model):
    id_company = db.Column(db.Integer, unique=True, primary_key=True)
    cp_name = db.Column(db.String(255))
    REGON = db.Column(db.String(9))
    NIP = db.Column(db.String(10))
    postal_code = db.Column(db.String(20))
    street = db.Column(db.String(30))
    city = db.Column(db.String(30))
    house_number = db.Column(db.String(30))
    cp_type = db.Column(db.String(50))

    def __init__(self, id_company, cp_name,REGON, NIP,postal_code, street, city, house_number, cp_type):
        self.id_company = id_company
        self.cp_name = cp_name
        self.REGON = REGON
        self.NIP = NIP
        self.postal_code = postal_code
        self.street = street
        self.city = city
        self.house_number = house_number
        self.cp_type = cp_type

class Property(db.Model):
    id_property = db.Column(db.Integer, unique=True, primary_key=True)
    id_owner = db.Column(db.Integer, db.ForeignKey('user.id_user')) 
    title = db.Column(db.String(100))
    #IDK czy tak z ta cena ale dalem ze do 2 dokladnosc miejsc
    price = db.Column(db.Float(precision = 2))
    square_metrage = db.Column(db.Float)
    #surroundings = db.Column(db.String(20))
    finishing_standard = db.Column(db.String(20))
    condition = db.Column(db.String(30))
    market = db.Column(db.String(20))
    publication_date = db.Column(db.Date)
    p_p_meter = db.Column(db.Float)
    sponsored = db.Column(db.Boolean)
    address = db.relationship('Address', uselist=False, backref='property', lazy=True) #uselist=false do relacji jeden do jednego
    inside = db.relationship('Inside', uselist=False, backref='property', lazy=True)

    def __init__(self, id_property, id_owner, title, price, square_metrage,finishing_standard, condition, market, publication_date, p_p_meter, sposored):
        self.id_property = id_property
        self.id_owner = id_owner
        self.title = title
        self.price = price
        self.square_metrage = square_metrage
        self.finishing_standard = finishing_standard
        self.condition = condition
        self.market = market
        self.publication_date = publication_date
        self.p_p_meter = p_p_meter
        self.sponsored = sposored

class Address(db.Model):
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'), primary_key=True)
    county = db.Column(db.String(20))
    region = db.Column(db.String(20))
    district = db.Column(db.String(20))
    locality = db.Column(db.String(20))
    street = db.Column(db.String(30))
    postal_code = db.Column(db.String(20))
    house_number = db.Column(db.String(6))
    coordinates= db.Column(db.Integer)
    
    def __init__(self, id_property, county,region, district, locality, street, postal_code, house_number, coordinates):
        self.id_property = id_property
        self.county = county
        self.region = region
        self.district = district
        self.locality = locality
        self.street = street
        self.postal_code = postal_code
        self.house_number = house_number
        self.coordinates = coordinates
class Photo(db.Model):
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'), primary_key=True)
    address_photo = db.Column(db.String(100))
    description_photo = db.Column(db.String(255))

    def __init__(self, id_property, address_photo, description_photo):
        self.id_property = id_property
        self.address_photo = address_photo
        self.description_photo = description_photo

class Inside(db.Model):
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'), primary_key=True)
    id_infrastructure = db.Column(db.Integer)
    nr_rooms = db.Column(db.Integer)
    nr_bathrooms = db.Column(db.Integer)
    basement = db.Column(db.Boolean)
    attic = db.Column(db.Boolean)
    nr_garages = db.Column(db.Integer)
    nr_balconies = db.Column(db.Integer)
    nr_floors = db.Column(db.Integer)
    type_of_heating = db.Column(db.String(30))
    condition = db.Column(db.String(30))
    description = db.Column(db.String(500))

    def __init__(self, id_property, nr_rooms, nr_bathrooms,basement,attic, nr_garages, nr_balconies, nr_floors, type_of_heating,condition, description):
        self.id_property = id_property
        self.nr_rooms = nr_rooms
        self.nr_bathrooms = nr_bathrooms
        self.basement = basement
        self.attic = attic
        self.nr_garages = nr_garages
        self.nr_balconies = nr_balconies
        self.nr_floors = nr_floors
        self.type_of_heating = type_of_heating
        self.condition = condition
        self.description = description

class Infrastructure(db.Model):
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'), primary_key=True)
    shop_distance = db.Column(db.Integer)
    park_distance = db.Column(db.Integer)
    playground_distance = db.Column(db.Integer)
    kindergarden_distance = db.Column(db.Integer)
    school_distance = db.Column(db.Integer)
    bicycle_rack = db.Column(db.Boolean)
    car_parking_space = db.Column(db.Boolean)

    def __init__(self, id_property, shop_distance, park_dostance, playground_distance, kindergarden_distance, school_distance, bicycle_rack, car_parking_space):
        self.id_property = id_property
        self.shop_distance = shop_distance
        self.park_distance = park_dostance
        self.playground_distance = playground_distance
        self.kindergarden_distance = kindergarden_distance
        self.school_distance = school_distance
        self.bicycle_rack = bicycle_rack
        self.car_parking_space = car_parking_space
        