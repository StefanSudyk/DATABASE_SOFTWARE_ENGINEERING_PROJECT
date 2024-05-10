from flask import jsonify, Response
from flask_restful import Resource, reqparse, fields, marshal_with
from models import *
from propertyService import *
import requests

resource_postproperty_fields = {
    'id_owner': fields.String,
    'title' : fields.String,
    'price' : fields.String,
    'square_metrage' : fields.String,
    'finishing_standard' : fields.String,
    'condition' : fields.String,
    'market' : fields.String,
    'publication_date': fields.String,
    'p_p_meter': fields.String,
    'sponsored': fields.String,

    'county': fields.String,
    'region': fields.String,
    'district': fields.String,
    'locality': fields.String,
    'street': fields.String,
    'postal_code': fields.String,
    'house_number': fields.String,
    'coordinates': fields.String,

    'address_photo':fields.String,
    'description_photo':fields.String,
    
    'nr_rooms':fields.String,
    'nr_bathrooms':fields.String,
    'basement':fields.String,
    'attic':fields.String,
    'nr_garages':fields.String,
    'nr_balconies':fields.String,
    'nr_floors':fields.String,
    'type_of_heating':fields.String,
    'condition_':fields.String,
    'description':fields.String,

    'shop_distance':fields.String,
    'park_distance':fields.String,
    'playground_distance':fields.String,
    'kindergarden_distance':fields.String,
    'school_distance':fields.String,
    'bicycle_rack':fields.String,
    'car_parking_space':fields.String,

    'id_room':fields.String,
    'room_metrage':fields.String

}

class GetProperty(Resource):
    def get(self, id_property):
        property = Property.query.get_or_404(id_property)
        address= Address.query.get_or_404(id_property)
        photo=Photo.query.get_or_404(id_property)
        inside=Inside.query.get_or_404(id_property)
        infrastructure=Infrastructure.query.get_or_404(id_property)
        room=Room.query.get_or_404(id_property)

        return jsonify({
            'id_property':property.id_property,
            #'id_owner': property.id_owner,
            'title' : property.title,
            'price' : property.price,
            'square_metrage' : property.square_metrage,
            'finishing_standard' : property.finishing_standard,
            'condition' : property.condition,
            'market' : property.market,
            'publication_date': property.publication_date,
            'p_p_meter': property.p_p_meter,
            'sponsored': property.sponsored,

            'county': address.county,
            'region': address.region,
            'district': address.district,
            'locality': address.locality,
            'street': address.street,
            'postal_code': address.postal_code,
            'house_number': address.house_number,
            'coordinates': address.coordinates,

            'address_photo':photo.address_photo,
            'description_photo':photo.description_photo,
            
            'nr_rooms':inside.nr_rooms,
            'nr_bathrooms':inside.nr_bathrooms,
            'basement':inside.basement,
            'attic':inside.attic,
            'nr_garages':inside.nr_garages,
            'nr_balconies':inside.nr_balconies,
            'nr_floors':inside.nr_floors,
            'type_of_heating':inside.type_of_heating,
            'condition_':inside.condition_,
            'description':inside.description,

            'shop_distance':infrastructure.shop_distance,
            'park_distance':infrastructure.park_distance,
            'playground_distance':infrastructure.playground_distance,
            'kindergarden_distance':infrastructure.kindergarden_distance,
            'school_distance':infrastructure.school_distance,
            'bicycle_rack':infrastructure.bicycle_rack,
            'car_parking_space':infrastructure.car_parking_space,

            'id_room':room.id_room,
            'room_metrage':room.room_metrage

        })

class GetAllProperty(Resource):
        def get(self):
                try:
                    properties = Property.query.all()
                    addresses= Address.query.all()
                    photos=Photo.query.all()
                    insides=Inside.query.all()
                    infrastructures=Infrastructure.query.all()
                    rooms=Room.query.all()
                    if properties == []:
                        return Response("No property", status=500, mimetype='application/json')
                    return jsonify([{
                        'id_property':property.id_property,
                        #'id_owner': properties.id_owner,
                        'title' : property.title,
                        'price' : property.price,
                        'square_metrage' : property.square_metrage,
                        'finishing_standard' : property.finishing_standard,
                        'condition' : property.condition,
                        'market' : property.market,
                        'publication_date': property.publication_date,
                        'p_p_meter': property.p_p_meter,
                        'sponsored': property.sponsored
                        
                    } for property in properties])
                except Exception as e:
                    return Response('Error: no properties. '+str(e), status=501, mimetype='application/json')


class PostProperty(Resource):

    @marshal_with(resource_postproperty_fields)
    def post(self):
        parser = reqparse.RequestParser()
        #Property
        parser.add_argument('title', type=str, required=True, help='Title is essential')
        parser.add_argument('price', type=float, required=True, help='Price is essential')
        parser.add_argument('square_metrage', type=float, required=True, help='Square metrage is essential')
        parser.add_argument('finishing_standard', type=str, required=True, help='Finishing standard is essential')
        parser.add_argument('condition', type=str, required=True, help='condition again is essential')
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
        parser.add_argument('id_room', type=int, required=False, help='id_room')
        parser.add_argument('room_metrage', type=float, required=True, help='room_metrage')



        args = parser.parse_args()
        print(args)

        def is_float(value):
            try:
                float(value)
                return True
            except ValueError:
                return False
        is_ok = True

        if not args['title'].isalpha():
            is_ok = False
            print("Title must contain only letters")
            return "Title must contain only letters",401
        
        if not is_float(args['price']):
            is_ok = False
            print("Price must contain only numbers")
            return "Price must contain only numbers",401
        
        if not is_float(args['square_metrage']):
            is_ok = False
            print("Square_metrage must contain only numbers")
            return "Square_metrage must contain only numbers",401
        
        if not args['postal_code'].isdigit():
            is_ok = False
            print("Postal code must contain only numbers")
            return "Postal code must contain only numbers",401
        
        if not args['house_number'].isdigit():
            is_ok = False
            print("House number must contain only numbers")
            return "House number must contain only numbers",401
        
        # if not args['coordinates'].isdigit():
        #     is_ok = False
        #     print("Coordinates number must contain only numbers")
        #     return "Coordinates must contain only numbers",401
        
        # if not args['nr_rooms'].isdigit():
        #     is_ok = False
        #     print("Number of rooms number must contain only numbers")
        #     return "Number of rooms must contain only numbers",401
        
        # if not args['nr_bathrooms'].isdigit():
        #     is_ok = False
        #     print("Number of bathrooms number must contain only numbers")
        #     return "Number of bathrooms must contain only numbers",401
        
        # if not args['nr_garages'].isdigit():
        #     is_ok = False
        #     print("Number of garages number must contain only numbers")
        #     return "Number of garages must contain only numbers",401
        
        # if not args['nr_balconies'].isdigit():
        #     is_ok = False
        #     print("Number of balconies must contain only numbers")
        #     return "Number of balconies must contain only numbers",401
        
        # if not args['nr_floors'].isdigit():
        #     is_ok = False
        #     print("Number of floors must contain only numbers")
        #     return "Number of floors must contain only numbers",401
        
        # if not args['shop_distance'].isdigit():
        #     is_ok = False
        #     print("Shop distance must contain only numbers")
        #     return "Shop distance must contain only numbers",401
        
        # if not args['park_distance'].isdigit():
        #     is_ok = False
        #     print("Park distance must contain only numbers")
        #     return "Park distance must contain only numbers",401
        
        # if not args['playground_distance'].isdigit():
        #     is_ok = False
        #     print("Playground distance must contain only numbers")
        #     return "Playground distance must contain only numbers",401
        
        # if not args['kindergarden_distance'].isdigit():
        #     is_ok = False
        #     print("Kindergarden distance must contain only numbers")
        #     return "Kindergarden distance must contain only numbers",401
        
        # if not args['school_distance'].isdigit():
        #     is_ok = False
        #     print("School distance must contain only numbers")
        #     return "School distance must contain only numbers",401
        
        if not is_float(args['room_metrage']):
            is_ok = False
            print("Room metrage must contain only numbers")
            return "Room metrage must contain only numbers",401

        if is_ok:
            propertyservice=PropertyService()
            propertyservice.add_property(args)
            return Response("property added", status=201, mimetype='application/json')
        else:
            return Response("something went wrong", status=500, mimetype='application/json')
        
class DeleteProperty(Resource):
    def delete(self, id_property):
        try:
            property = Property.query.get_or_404(id_property)
            address= Address.query.get_or_404(id_property)
            photo=Photo.query.get_or_404(id_property)
            inside=Inside.query.get_or_404(id_property)
            infrastructure=Infrastructure.query.get_or_404(id_property)
            room=Room.query.get_or_404(id_property)
            db.session.delete(property)
            db.session.delete(address)
            db.session.delete(photo)
            db.session.delete(inside)
            db.session.delete(infrastructure)
            db.session.delete(room)
            db.session.commit()
            return Response("property deleted", status=200, mimetype='application/json')
        except Exception as e:
            return Response('Error: no property to delete. '+str(e), status=501, mimetype='application/json')
