from flask import jsonify, Response, request
from flask_restful import Resource, reqparse, fields, marshal_with
from models import *
from service.propertyService import *
from sqlalchemy.sql import exists
from flask_restful import abort
import re
from propertyFilters import *
from validators.propertyValidator import propertyValidation
from validators.photoValidator import PhotoValidation
import base64

resource_postproperty_fields = {
    'id_owner': fields.Integer,
    'title' : fields.String,
    'price' : fields.Float,
    'square_metrage' : fields.Float,
    'finishing_standard' : fields.String,
    #'condition' : fields.String,
    'market' : fields.String,

    'county': fields.String,
    'region': fields.String,
    'district': fields.String,
    'locality': fields.String,
    'street': fields.String,
    'postal_code': fields.String,
    'house_number': fields.String,
    'coordinates': fields.Integer,

    'address_photo':fields.String,
    'description_photo':fields.String,
    'photo':fields.String, #string, bo musi byc przekazane zdjecie w formie base64
    
    'nr_rooms':fields.Integer,
    'nr_bathrooms':fields.Integer,
    'basement':fields.Boolean,
    'attic':fields.Boolean,
    'nr_garages':fields.Integer,
    'nr_balconies':fields.Integer,
    'nr_floors':fields.Integer,
    'type_of_heating':fields.String,
    'condition_':fields.String,
    'description':fields.String,

    'shop_distance':fields.Integer,
    'park_distance':fields.Integer,
    'playground_distance':fields.Integer,
    'kindergarden_distance':fields.Integer,
    'school_distance':fields.Integer,
    'bicycle_rack':fields.Boolean,
    'car_parking_space':fields.Boolean,

    'room_index':fields.Integer,
    'room_metrage':fields.Float

}
class UpdateProperty(Resource):
    @marshal_with(resource_postproperty_fields)
    def patch(self, property_id):
        parser = reqparse.RequestParser()
        #Property
        parser.add_argument('title', type=str, required=True, help='Title is essential')
        parser.add_argument('price', type=float, required=True, help='Price is essential')
        parser.add_argument('square_metrage', type=float, required=True, help='Square metrage is essential')
        parser.add_argument('finishing_standard', type=str, required=True, help='Finishing standard is essential')
        #parser.add_argument('condition', type=str, required=True, help='condition again is essential')
        parser.add_argument('market', type=str, required=True, help='market is essential')
        #Address
        parser.add_argument('county', type=str, required=True, help='county is essential')
        parser.add_argument('region', type=str, required=True, help='region is essential')
        parser.add_argument('district', type=str, required=True, help='district is essential')
        parser.add_argument('locality', type=str, required=True, help='locality is essential')
        parser.add_argument('street', type=str, required=True, help='street is essential')
        parser.add_argument('postal_code', type=str, required=True, help='postal_code is essential')
        parser.add_argument('house_number', type=str, required=True, help='house_number is essential')
        parser.add_argument('coordinates', type=int, required=True, help='coordinates is essential')
        #Photo
        parser.add_argument('address_photo', type=str, required=True, help='address_photo is essential')
        parser.add_argument('description_photo', type=str, required=True, help='description_photo is essential')
        parser.add_argument('photo', type=str, required=True, help='photo is essential')
        #Inside
        parser.add_argument('nr_rooms', type=int, required=True, help='nr_rooms is essential')
        parser.add_argument('nr_bathrooms', type=int, required=True, help='nr_bathrooms is essential')
        parser.add_argument('basement', type=bool, required=True, help='basement is essential')
        parser.add_argument('attic', type=bool, required=True, help='attic is essential')
        parser.add_argument('nr_garages', type=int, required=True, help='nr_garages is essential')
        parser.add_argument('nr_balconies', type=int, required=True, help='nr_balconies is essential')
        parser.add_argument('nr_floors', type=int, required=True, help='nr_floors is essential')
        parser.add_argument('type_of_heating', type=str, required=True, help='type_of_heating is essential')
        parser.add_argument('condition_', type=str, required=True, help='condition_ is essential')
        parser.add_argument('description', type=str, required=True, help='description is essential')
        #Infrastructure
        parser.add_argument('shop_distance', type=int, required=False, help='shop_distance  is essential')
        parser.add_argument('park_distance', type=int, required=False, help='park_distance is essential')
        parser.add_argument('playground_distance', type=int, required=False, help='playground_distance is essential')
        parser.add_argument('kindergarden_distance', type=int, required=False, help='kindergarden_distance is essential')
        parser.add_argument('school_distance', type=int, required=False, help='school_distance is essential')
        parser.add_argument('bicycle_rack', type=bool, required=True, help='bicycle_rack is essential')
        parser.add_argument('car_parking_space', type=bool, required=True, help='car_parking_space is essential')
        #Room
        parser.add_argument('room_index', type=int, required=True, help='Room number is essential')
        parser.add_argument('room_metrage', type=float, required=True, help='room_metrage')
        args = parser.parse_args()
        print(args)

        photo_validator = PhotoValidation()
        if not (photo_validator.address_photo_validation(args['address_photo']) and
            photo_validator.description_photo_validation(args['description_photo']) and
            photo_validator.photo_validation(args['photo'])):

            return Response("something went wrong", status=500, mimetype='application/json')

        validator=propertyValidation()
        property_service = PropertyService()
        if not (validator.postal_validation(args['postal_code'])and
            # validator.house_nr_validation(args['house_number'])and
            # validator.title_validation(args['title'])and
            validator.price_validation(args['price'])and
            validator.sq_metrage_validation(args['square_metrage'])and
            validator.sq_metrage_validation(args['room_metrage'])):
            
            return Response("something went wrong", status=500, mimetype='application/json')

        property_service.update_property(property_id,args)
        return Response("property changed", status=201, mimetype='application/json')

class GetProperty(Resource):
    def get(self, id_property):
        property_service = PropertyService()
        try:
            get_response = property_service.get_property(id_property)
                
            return get_response
        
        except Exception as e:
            return Response('Error: user not find. '+str(e), status=501, mimetype='application/json')

class GetAllProperty(Resource):
    def get(self):
        property_service = PropertyService()
        price_range = request.args.get('price_range')
        metrage_range = request.args.get('metrage_range')
        finishing_standard = request.args.get('finishing_standard')
        nr_rooms = request.args.get("nr_rooms")
        country = request.args.get('country')
        locality = request.args.get('locality')
        street = request.args.get('street')
        district = request.args.get('district')
        condition = request.args.get('condition')
        user = request.args.get('user')
        #tak btw finishing_standard to typ nieruchomosci a condition poziom wykonczenia xD
        try:
            if price_range:
                price_from, price_to = map(float, price_range.split('-'))
                properties = filter_by_price(price_from, price_to)
            elif metrage_range:
                metrage_from, metrage_to = map(float, metrage_range.split('-'))
                properties = filter_by_square_metrage(metrage_from, metrage_to)
            elif finishing_standard:
                properties = filter_by_finishing_standard(finishing_standard)
            elif nr_rooms:
                properties = filter_by_nr_rooms(nr_rooms)
            elif country:
                properties = filter_by_address(country, locality, street, district)
            elif condition:
                properties = filter_by_condition(condition)
            elif user:
                properties = filter_by_user(user)
            else:
                properties = Property.query.all()

            if not properties:
                return Response("No property", status=500, mimetype='application/json')

            # Pobieranie zdjęć przypisanych do właściwości
            photos = Photo.query.filter(Photo.id_property.in_([property.id_property for property in properties])).all()

            if price_range is not None or metrage_range is not None or finishing_standard is not None or nr_rooms is not None or country is not None or condition is not None or user is not None:
                return property_service.get_properties_and_photos(properties, photos)
            else:
                addresses = Address.query.all()
                insides = Inside.query.all()
                infrastructures = Infrastructure.query.all()
                rooms = Room.query.all()
                return property_service.get_all_properties_with_all(properties, addresses, photos, insides, infrastructures, rooms)

        except Exception as e:
            return Response('Error: no properties. ' + str(e), status=501, mimetype='application/json')


class PostProperty(Resource):

    @marshal_with(resource_postproperty_fields)
    def post(self):
        parser = reqparse.RequestParser()
        #Property
        parser.add_argument('title', type=str, required=True, help='Title is essential')
        parser.add_argument('price', type=float, required=True, help='Price is essential')
        parser.add_argument('square_metrage', type=float, required=True, help='Square metrage is essential')
        parser.add_argument('finishing_standard', type=str, required=True, help='Finishing standard is essential')
        #parser.add_argument('condition', type=str, required=True, help='condition again is essential')
        parser.add_argument('market', type=str, required=True, help='market is essential')
        #Address
        parser.add_argument('county', type=str, required=True, help='county is essential')
        parser.add_argument('region', type=str, required=True, help='region is essential')
        parser.add_argument('district', type=str, required=True, help='district is essential')
        parser.add_argument('locality', type=str, required=True, help='locality is essential')
        parser.add_argument('street', type=str, required=True, help='street is essential')
        parser.add_argument('postal_code', type=str, required=True, help='postal_code is essential')
        parser.add_argument('house_number', type=str, required=True, help='house_number is essential')
        parser.add_argument('coordinates', type=int, required=True, help='coordinates is essential')
        #Photo
        parser.add_argument('address_photo', type=str, required=True, help='address_photo is essential')
        parser.add_argument('description_photo', type=str, required=True, help='description_photo is essential')
        parser.add_argument('photo', type=str, required=True, help='photo is essential')
        #Inside
        parser.add_argument('nr_rooms', type=int, required=True, help='nr_rooms is essential')
        parser.add_argument('nr_bathrooms', type=int, required=True, help='nr_bathrooms is essential')
        parser.add_argument('basement', type=bool, required=True, help='basement is essential')
        parser.add_argument('attic', type=bool, required=True, help='attic is essential')
        parser.add_argument('nr_garages', type=int, required=True, help='nr_garages is essential')
        parser.add_argument('nr_balconies', type=int, required=True, help='nr_balconies is essential')
        parser.add_argument('nr_floors', type=int, required=True, help='nr_floors is essential')
        parser.add_argument('type_of_heating', type=str, required=True, help='type_of_heating is essential')
        parser.add_argument('condition_', type=str, required=True, help='condition_ is essential')
        parser.add_argument('description', type=str, required=True, help='description is essential')
        #Infrastructure
        parser.add_argument('shop_distance', type=int, required=False, help='shop_distance  is essential')
        parser.add_argument('park_distance', type=int, required=False, help='park_distance is essential')
        parser.add_argument('playground_distance', type=int, required=False, help='playground_distance is essential')
        parser.add_argument('kindergarden_distance', type=int, required=False, help='kindergarden_distance is essential')
        parser.add_argument('school_distance', type=int, required=False, help='school_distance is essential')
        parser.add_argument('bicycle_rack', type=bool, required=True, help='bicycle_rack is essential')
        parser.add_argument('car_parking_space', type=bool, required=True, help='car_parking_space is essential')
        #Room
        parser.add_argument('room_index', type=int, required=True, help='Room number is essential')
        parser.add_argument('room_metrage', type=float, required=True, help='room_metrage')

        args = parser.parse_args()
        print(args)

        photo_validator = PhotoValidation()
        if not (photo_validator.address_photo_validation(args['address_photo']) and
            photo_validator.description_photo_validation(args['description_photo']) and
            photo_validator.photo_validation(args['photo'])):

            return Response("something went wrong", status=500, mimetype='application/json')

        validator=propertyValidation()
        property_service = PropertyService()
        if not (validator.postal_validation(args['postal_code'])and
            # validator.house_nr_validation(args['house_number'])and
            # validator.title_validation(args['title'])and
            validator.price_validation(args['price'])and
            validator.sq_metrage_validation(args['square_metrage'])and
            validator.sq_metrage_validation(args['room_metrage'])):
            
            return Response("something went wrong", status=500, mimetype='application/json')
        
        publication_date=datetime.today()
        formated_date = publication_date.strftime('%Y-%m-%d')
        p_p_meter=args['price']/args['square_metrage']

        #id = db.session.execute(select(User.id_user).where(User.phone_number == session['phonenumber'])).first()
        #id = db.session.execute(select(User.id_user).where(User.phone_number == '222222222')).first()
        id = current_user.id_user
        new_property = Property(
            #id_property=property_id,
            id_owner=id,
            title=args['title'],
            price=args['price'],
            square_metrage=args['square_metrage'],
            finishing_standard=args['finishing_standard'],
            #condition=property_data['condition'],
            market=args['market'],
            p_p_meter=p_p_meter,
            publication_date=formated_date,
            sponsored=0
        )

        property_service.add_property_table(new_property)

        property_id=new_property.id_property

        new_address=Address(
            id_property=property_id,
            county=args['county'],
            region=args['region'],
            district=args['district'],
            locality=args['locality'],
            street=args['street'],
            postal_code=args['postal_code'],
            house_number=args['house_number'],
            coordinates=args['coordinates']
        )

        binary_photo = base64.b64decode(args['photo'])

        new_photo=Photo(
            id_property=property_id,
            address_photo=args['address_photo'],
            photo = binary_photo,
            description_photo=args['description_photo'],
        )

        new_inside=Inside(
            id_property=property_id,
            nr_rooms=args['nr_rooms'],
            nr_bathrooms=args['nr_bathrooms'],
            basement=args['basement'],
            attic=args['attic'],
            nr_garages=args['nr_garages'],
            nr_balconies=args['nr_balconies'],
            nr_floors=args['nr_floors'],
            type_of_heating=args['type_of_heating'],
            condition_=args['condition_'],
            description=args['description']
        )

        new_infrastructure=Infrastructure(
            id_property=property_id,
            shop_distance=args['shop_distance'],
            park_distance=args['park_distance'],
            playground_distance=args['playground_distance'],
            kindergarden_distance=args['kindergarden_distance'],
            school_distance=args['school_distance'],
            bicycle_rack=args['bicycle_rack'],
            car_parking_space=args['car_parking_space']
        )

        new_room=Room(
            id_property=property_id,
            room_index=args['room_index'],
            room_metrage=args['room_metrage']
        )

        property_service.add_property(new_address, new_photo, new_inside, new_infrastructure, new_room)
        return Response("property added", status=201, mimetype='application/json')


class DeleteProperty(Resource):
    def delete(self, id_property):
        property_service=PropertyService()
        try:
            property_service.delete_property(id_property)
            return Response("property deleted", status=200, mimetype='application/json')
        except Exception as e:
            return Response('Error: no property to delete. '+str(e), status=501, mimetype='application/json')
     