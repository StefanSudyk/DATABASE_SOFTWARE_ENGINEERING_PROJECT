from app import db
import enum

"""
python
from run import flask_app
from app import db
db.drop_all()
db.create_all()
"""

class UserType(str, enum.Enum):
    ADMIN = 'Admin'
    USER = 'User'
    COMPANY = 'Company'


class User(db.Model):
    # TODO - poprawić tabele id_company, wyjebalem ja - zmieniony __init__
    id_user = db.Column(db.Integer, unique=True, primary_key=True)
    id_company = db.Column(db.Integer, db.ForeignKey('company.id_company'), unique=True)
    name = db.Column(db.String(20))
    surname = db.Column(db.String(20))
    phone_number = db.Column(db.String(9))
    password = db.Column(db.String(20))
    email = db.Column(db.String(50))
    usertype = db.Column(db.Enum(UserType))
    properties = db.relationship('Property', backref='owner', lazy=True)
    favourites = db.relationship('Favourite', backref='user', lazy=True)

    def __init__(self, name, surname, phone_number, password, email, usertype):
        self.name = name
        self.surname = surname
        self.phone_number = phone_number
        self.password = password
        self.email = email
        self.usertype = usertype


class Favourite(db.Model):
    id_favourite = db.Column(db.Integer, unique=True, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'))
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'))

    def __init__(self, id_favourite, id_user, id_property):
        self.id_favourite = id_favourite
        self.id_user = id_user
        self.id_property = id_property


class Company_Type(enum.Enum):
    DEVELOPER = "Developer"
    ESTATE_AGENCY = "Estate agency"


class Company(db.Model):
    id_company = db.Column(db.Integer, unique=True, primary_key=True)
    cp_name = db.Column(db.String(255))
    REGON = db.Column(db.String(9))
    NIP = db.Column(db.String(10))
    postal_code = db.Column(db.String(20))
    street = db.Column(db.String(30))
    city = db.Column(db.String(30))
    house_number = db.Column(db.String(30))
    cp_type = db.Column(db.Enum(Company_Type))
    user = db.relationship("User", uselist=False, backref="company")

    def __init__(self, id_company, cp_name, REGON, NIP, postal_code, street, city, house_number, cp_type):
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
    id_owner = db.Column(db.Integer, db.ForeignKey('user.id_user'), unique=True)
    title = db.Column(db.String(100))
    #IDK czy tak z ta cena ale dalem ze do 2 dokladnosc miejsc
    price = db.Column(db.Float(precision=2))
    square_metrage = db.Column(db.Float)
    #surroundings = db.Column(db.String(20))
    finishing_standard = db.Column(db.String(20))
    condition = db.Column(db.String(30))
    market = db.Column(db.String(20))
    publication_date = db.Column(db.Date)
    p_p_meter = db.Column(db.Float)
    sponsored = db.Column(db.Boolean)
    address = db.relationship('Address', uselist=False, backref='property', lazy=True)  #uselist=false do relacji jeden do jednego
    inside = db.relationship('Inside', uselist=False, backref='property', lazy=True)
    infrastructure = db.relationship('Infrastructure', uselist=False, backref='property', lazy=True)
    photos = db.relationship('Photo', backref='property', lazy=True)
    rooms = db.relationship('Room', backref='property', lazy=True)
    favourites = db.relationship('Favourite', backref='property', lazy=True)

    def __init__(self, id_property, id_owner, title, price, square_metrage, finishing_standard, condition, market,
                 publication_date, p_p_meter, sposored):
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
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'), primary_key=True, unique=True)
    county = db.Column(db.String(20))
    region = db.Column(db.String(20))
    district = db.Column(db.String(20))
    locality = db.Column(db.String(20))
    street = db.Column(db.String(30))
    postal_code = db.Column(db.String(20))
    house_number = db.Column(db.String(6))
    coordinates = db.Column(db.Integer)

    def __init__(self, id_property, county, region, district, locality, street, postal_code, house_number, coordinates):
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


class Heatinig(enum.Enum):
    LACK = "Lack"
    HEAT_PUMP = "Heat pump"
    FURNACE = "Furnace"
    ECO_PEA_STOVE = "Eco-pea stove"
    GAS_FURNACE = "Gas furnace"
    ELECTRIC_HEATING = "Electric heating"
    SOLAR_PANELS = "Solar panels"


class Condition(enum.Enum):
    FORMALITIES = "Formalities"
    ZERO_CONDITION = "Zero condition"
    OPEN_BASIC_CONDITION = "Open basic condition"
    CLOSE_BASIC_CONDITION = "Close basic condition"
    FINISHING_WORKS = "Finishing works"
    FINISHED = "Finished"


class Inside(db.Model):
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'), primary_key=True, unique=True)
    id_infrastructure = db.Column(db.Integer)
    nr_rooms = db.Column(db.Integer)
    nr_bathrooms = db.Column(db.Integer)
    basement = db.Column(db.Boolean)
    attic = db.Column(db.Boolean)
    nr_garages = db.Column(db.Integer)
    nr_balconies = db.Column(db.Integer)
    nr_floors = db.Column(db.Integer)
    type_of_heating = db.Column(db.Enum(Heatinig))
    condition_ = db.Column(db.Enum(Condition))
    description = db.Column(db.String(500))

    def __init__(self, id_property, nr_rooms, nr_bathrooms, basement, attic, nr_garages, nr_balconies, nr_floors,
                 type_of_heating, condition_, description):
        self.id_property = id_property
        self.nr_rooms = nr_rooms
        self.nr_bathrooms = nr_bathrooms
        self.basement = basement
        self.attic = attic
        self.nr_garages = nr_garages
        self.nr_balconies = nr_balconies
        self.nr_floors = nr_floors
        self.type_of_heating = type_of_heating
        self.condition_ = condition_
        self.description = description


class Infrastructure(db.Model):
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'), primary_key=True, unique=True)
    shop_distance = db.Column(db.Integer)
    park_distance = db.Column(db.Integer)
    playground_distance = db.Column(db.Integer)
    kindergarden_distance = db.Column(db.Integer)
    school_distance = db.Column(db.Integer)
    bicycle_rack = db.Column(db.Boolean)
    car_parking_space = db.Column(db.Boolean)

    def __init__(self, id_property, shop_distance, park_dostance, playground_distance, kindergarden_distance,
                 school_distance, bicycle_rack, car_parking_space):
        self.id_property = id_property
        self.shop_distance = shop_distance
        self.park_distance = park_dostance
        self.playground_distance = playground_distance
        self.kindergarden_distance = kindergarden_distance
        self.school_distance = school_distance
        self.bicycle_rack = bicycle_rack
        self.car_parking_space = car_parking_space


class Room(db.Model):
    id_property = db.Column(db.Integer, db.ForeignKey('property.id_property'))
    id_room = db.Column(db.Integer, primary_key=True)
    room_metrage = db.Column(db.Float)

    def __init__(self, id_property, id_room, room_metrage):
        self.id_property = id_property
        self.id_room = id_room
        self.room_metrage = room_metrage
