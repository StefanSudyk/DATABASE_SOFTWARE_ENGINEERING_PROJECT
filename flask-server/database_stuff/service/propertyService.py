from datetime import datetime
from flask import session,Response, jsonify
from models import *
from sqlalchemy import select
import base64

class PropertyService:
    def delete_property(self,id_property):
        property = Property.query.get_or_404(id_property)
        address= Address.query.get_or_404(id_property)
        photo=Photo.query.get_or_404(id_property)
        inside=Inside.query.get_or_404(id_property)
        infrastructure=Infrastructure.query.get_or_404(id_property)
        room = Room.query.filter_by(id_property=id_property).first_or_404()
        db.session.delete(property)
        db.session.delete(address)
        db.session.delete(photo)
        db.session.delete(inside)
        db.session.delete(infrastructure)
        db.session.delete(room)
        db.session.commit()

    #doesnt work, dont use
    # def is_address_unique_update(self,property_id, county,region,district,locality,street,postal_code,house_number):
    #     # check if we did not change address
    #     address=Address.query.get(property_id)
    #     if(address.county==Address.query.filter_by(county=county).first() and
    #        address.region==Address.query.filter_by(region=region).first() and
    #        address.district==Address.query.filter_by(district=district).first() and
    #        address.locality==Address.query.filter_by(locality=locality).first() and
    #        address.street==Address.query.filter_by(street=street).first()  and
    #        address.postal_code==Address.query.filter_by(postal_code=postal_code).first() and
    #        address.house_number==Address.query.filter_by(house_number=house_number).first() ):
    #         return True
    #     if not(Address.query.filter_by(county=county).first() and
    #             Address.query.filter_by(region=region).first() and
    #             Address.query.filter_by(district=district).first() and
    #             Address.query.filter_by(locality=locality).first() and
    #             Address.query.filter_by(street=street).first() and
    #             Address.query.filter_by(postal_code=postal_code).first() and
    #             Address.query.filter_by(house_number=house_number).first() ):
    #         return False
    #     return True
    # def is_address_unique(self, county,region,district,locality,street,postal_code,house_number):
    #     # check if address is already occupied
    #     if not(Address.query.filter_by(county=county).first() and
    #             Address.query.filter_by(region=region).first() and
    #             Address.query.filter_by(district=district).first() and
    #             Address.query.filter_by(locality=locality).first() and
    #             Address.query.filter_by(street=street).first() and
    #             Address.query.filter_by(postal_code=postal_code).first() and
    #             Address.query.filter_by(house_number=house_number).first() ):
    #         return False
    #     return True
    def patch_property(self):
        db.session.commit()
    
    def add_property(self, new_address, new_photo, new_inside, new_infrastructure, new_room):
        db.session.add(new_address)
        db.session.add(new_photo)
        db.session.add(new_inside)
        db.session.add(new_infrastructure)
        db.session.add(new_room)
        db.session.commit()

    def add_property_table(self, new_property):
        db.session.add(new_property)
        db.session.commit()

    def update_property(self, id_property, property_data):
        property = Property.query.get_or_404(id_property)
        address= Address.query.get_or_404(id_property)
        photo=Photo.query.get_or_404(id_property)
        inside=Inside.query.get_or_404(id_property)
        infrastructure=Infrastructure.query.get_or_404(id_property)
        room=Room.query.get_or_404(id_property)

        property.title = property_data['title']
        property.price = property_data['price']
        property.square_metrage = property_data['square_metrage']
        property.finishing_standard = property_data['finishing_standard']
        #property.condition = property_data['condition']
        property.market = property_data['market']
        print("1")
        address.county=property_data['county']
        address.region=property_data['region']
        address.district=property_data['district']
        address.locality=property_data['locality']
        address.street=property_data['street']
        address.postal_code=property_data['postal_code']
        address.house_number=property_data['house_number']
        address.coordinates=property_data['coordinates']
        print("2")
        binary_photo = base64.b64decode(property_data['photo'])

        photo.photo=binary_photo
        photo.address_photo=property_data['address_photo']
        photo.description_photo=property_data['description_photo']
        print("3")        
        inside.nr_rooms=property_data['nr_rooms']
        inside.nr_bathrooms=property_data['nr_bathrooms']
        inside.basement=property_data['basement']
        inside.attic=property_data['attic']
        inside.nr_garages=property_data['nr_garages']
        inside.nr_balconies=property_data['nr_balconies']
        inside.nr_floors=property_data['nr_floors']
        inside.type_of_heating=property_data['type_of_heating']
        inside.condition_=property_data['condition_']
        inside.description=property_data['description']
        print("4")
        infrastructure.shop_distance=property_data['shop_distance']
        infrastructure.park_distance=property_data['park_distance']
        infrastructure.playground_distance=property_data['playground_distance']
        infrastructure.kindergarden_distance=property_data['kindergarden_distance']
        infrastructure.school_distance=property_data['school_distance']
        infrastructure.bicycle_rack=property_data['bicycle_rack']
        infrastructure.car_parking_space=property_data['car_parking_space']
        print("5")
        room.room_index=property_data['room_index']
        room.room_metrage=property_data['room_metrage']
        db.session.commit()
        return Response("Company data updated", status=204, mimetype='application/json')
    

    def get_properties_and_photos(self, properties, photos, addresses, infrastructures, insides):
        photos_dict = {photo.id_property: photo for photo in photos}
        addresses_dict = {address.id_property: address for address in addresses}
        infrastructures_dict = {infrastructure.id_property: infrastructure for infrastructure in infrastructures}
        insides_dict = {inside.id_property: inside for inside in insides}

        return jsonify([{
            'property': {
                'id_property': property.id_property,
                'title': property.title,
                'price': property.price,
                'square_metrage': property.square_metrage,
                'finishing_standard': property.finishing_standard,
                'market': property.market,
                'publication_date': property.publication_date,
                'p_p_meter': property.p_p_meter,
                'sponsored': property.sponsored
            },
            'address': {
                'coordinates': addresses_dict[property.id_property].coordinates,
                'county': addresses_dict[property.id_property].county,
                'district': addresses_dict[property.id_property].district,
                'house_number': addresses_dict[property.id_property].house_number,
                'locality': addresses_dict[property.id_property].locality,
                'postal_code': addresses_dict[property.id_property].postal_code,
                'region': addresses_dict[property.id_property].region,
                'street': addresses_dict[property.id_property].street
            } if property.id_property in addresses_dict else {},
            'infrastructure': {
                'bicycle_rack': infrastructures_dict[property.id_property].bicycle_rack,
                'car_parking_space': infrastructures_dict[property.id_property].car_parking_space,
                'kindergarden_distance': infrastructures_dict[property.id_property].kindergarden_distance,
                'park_distance': infrastructures_dict[property.id_property].park_distance,
                'playground_distance': infrastructures_dict[property.id_property].playground_distance,
                'school_distance': infrastructures_dict[property.id_property].school_distance,
                'shop_distance': infrastructures_dict[property.id_property].shop_distance
            } if property.id_property in infrastructures_dict else {},
            'inside': {
                'attic': insides_dict[property.id_property].attic,
                'basement': insides_dict[property.id_property].basement,
                'condition_': insides_dict[property.id_property].condition_,
                'description': insides_dict[property.id_property].description,
                'nr_balconies': insides_dict[property.id_property].nr_balconies,
                'nr_bathrooms': insides_dict[property.id_property].nr_bathrooms,
                'nr_floors': insides_dict[property.id_property].nr_floors,
                'nr_garages': insides_dict[property.id_property].nr_garages,
                'nr_rooms': insides_dict[property.id_property].nr_rooms,
                'type_of_heating': insides_dict[property.id_property].type_of_heating
            } if property.id_property in insides_dict else {},
            'photos': [{
                'address_photo': photos_dict[property.id_property].address_photo,
                'photo': base64.b64encode(photos_dict[property.id_property].photo).decode('utf-8'),
                'description_photo': photos_dict[property.id_property].description_photo
            }] if property.id_property in photos_dict else []
        } for property in properties])


    #Wyswietla wszystko powiazane property
    def get_all_properties_with_all(self, properties, addresses, photos, insides, infrastructures, rooms):
        return jsonify([{
            'property': {
                'id_property': property.id_property,
                'title': property.title,
                'price': property.price,
                'square_metrage': property.square_metrage,
                'finishing_standard': property.finishing_standard,
                'market': property.market,
                'publication_date': property.publication_date,
                'p_p_meter': property.p_p_meter,
                'sponsored': property.sponsored
            },

            'address': {
                'county': address.county,
                'region': address.region ,
                'district': address.district ,
                'locality': address.locality ,
                'street': address.street ,
                'postal_code': address.postal_code ,
                'house_number': address.house_number ,
                'coordinates': address.coordinates 
            },

            'photo': {
                'address_photo': photo.address_photo ,
                'photo': base64.b64encode(photo.photo).decode('utf-8'),
                'description_photo': photo.description_photo 
            },

            'inside': {
                'nr_rooms': inside.nr_rooms ,
                'nr_bathrooms': inside.nr_bathrooms ,
                'basement': inside.basement ,
                'attic': inside.attic ,
                'nr_garages': inside.nr_garages ,
                'nr_balconies': inside.nr_balconies ,
                'nr_floors': inside.nr_floors ,
                'type_of_heating': inside.type_of_heating ,
                'condition_': inside.condition_ ,
                'description': inside.description 
            },

            'infrastructure': {
                'shop_distance': infrastructure.shop_distance ,
                'park_distance': infrastructure.park_distance ,
                'playground_distance': infrastructure.playground_distance ,
                'kindergarden_distance': infrastructure.kindergarden_distance ,
                'school_distance': infrastructure.school_distance ,
                'bicycle_rack': infrastructure.bicycle_rack ,
                'car_parking_space': infrastructure.car_parking_space 
            },
            
            'room': {
                'id_room': room.id_room ,
                'room_index': room.room_index,
                'room_metrage': room.room_metrage 
            }
        } for property, address, photo, inside, infrastructure, room in zip(properties, addresses, photos, insides, infrastructures, rooms)])
    
    def get_property(self, id_property):
        property = Property.query.get_or_404(id_property)
        address= Address.query.get_or_404(id_property)
        photo=Photo.query.get_or_404(id_property)
        inside=Inside.query.get_or_404(id_property)
        infrastructure=Infrastructure.query.get_or_404(id_property)
        room=Room.query.get_or_404(id_property)

        return jsonify({
            'id_property':property.id_property,
            'id_owner': property.id_owner,
            'title' : property.title,
            'price' : property.price,
            'square_metrage' : property.square_metrage,
            'finishing_standard' : property.finishing_standard,
            #'condition' : property.condition,
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
            'photo':base64.b64encode(photo.photo).decode('utf-8'), #odkodowany string tu juz jest nie binarny
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
            'room_index':room.room_index,
            'room_metrage':room.room_metrage

        })
    def get_all_addresses(self):
        print(type(Address.query.all()))
        return Address.query.all()
