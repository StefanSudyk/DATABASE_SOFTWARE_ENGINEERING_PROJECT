from datetime import datetime
from flask import session,Response, jsonify
from models import *
from sqlalchemy import select

class PropertyService:
    def delete_property(self,property,address,photo,inside,infrastructure,room):
        db.session.delete(property)
        db.session.delete(address)
        db.session.delete(photo)
        db.session.delete(inside)
        db.session.delete(infrastructure)
        db.session.delete(room)
        db.session.commit()

    #doesnt work, dont use
    def is_address_unique_update(self,property_id, county,region,district,locality,street,postal_code,house_number):
        # check if we did not change address
        address=Address.query.get(property_id)
        if(address.county==Address.query.filter_by(county=county).first() and
           address.region==Address.query.filter_by(region=region).first() and
           address.district==Address.query.filter_by(district=district).first() and
           address.locality==Address.query.filter_by(locality=locality).first() and
           address.street==Address.query.filter_by(street=street).first()  and
           address.postal_code==Address.query.filter_by(postal_code=postal_code).first() and
           address.house_number==Address.query.filter_by(house_number=house_number).first() ):
            return True
        if not(Address.query.filter_by(county=county).first() and
                Address.query.filter_by(region=region).first() and
                Address.query.filter_by(district=district).first() and
                Address.query.filter_by(locality=locality).first() and
                Address.query.filter_by(street=street).first() and
                Address.query.filter_by(postal_code=postal_code).first() and
                Address.query.filter_by(house_number=house_number).first() ):
            return False
        return True
    def is_address_unique(self, county,region,district,locality,street,postal_code,house_number):
        # check if address is already occupied
        if not(Address.query.filter_by(county=county).first() and
                Address.query.filter_by(region=region).first() and
                Address.query.filter_by(district=district).first() and
                Address.query.filter_by(locality=locality).first() and
                Address.query.filter_by(street=street).first() and
                Address.query.filter_by(postal_code=postal_code).first() and
                Address.query.filter_by(house_number=house_number).first() ):
            return False
        return True
    def patch_property(self):
        db.session.commit()
    
    def add_property(self, property_data):
        publication_date=datetime.today()
        formated_date = publication_date.strftime('%Y-%m-%d')
        p_p_meter=property_data['price']/property_data['square_metrage']
        
        
        #id = db.session.execute(select(User.id_user).where(User.phone_number == session['phonenumber'])).first()
        id = db.session.execute(select(User.id_user).where(User.phone_number == '222222222')).first()

        print(id)
        new_property = Property(
            #id_property=property_id,
            id_owner=id[0],
            title=property_data['title'],
            price=property_data['price'],
            square_metrage=property_data['square_metrage'],
            finishing_standard=property_data['finishing_standard'],
            #condition=property_data['condition'],
            market=property_data['market'],
            p_p_meter=p_p_meter,
            publication_date=formated_date,
            sponsored=0
        )
        
       
        db.session.add(new_property)
        db.session.commit()
        property_id=new_property.id_property
        new_address=Address(
            id_property=property_id,
            county=property_data['county'],
            region=property_data['region'],
            district=property_data['district'],
            locality=property_data['locality'],
            street=property_data['street'],
            postal_code=property_data['postal_code'],
            house_number=property_data['house_number'],
            coordinates=property_data['coordinates']
        )
        db.session.add(new_address)
        db.session.commit()

        new_photo=Photo(
            id_property=property_id,
            address_photo=property_data['address_photo'],
            description_photo=property_data['description_photo'],
        )
        db.session.add(new_photo)
        db.session.commit()
        
        new_inside=Inside(
            id_property=property_id,
            nr_rooms=property_data['nr_rooms'],
            nr_bathrooms=property_data['nr_bathrooms'],
            basement=property_data['basement'],
            attic=property_data['attic'],
            nr_garages=property_data['nr_garages'],
            nr_balconies=property_data['nr_balconies'],
            nr_floors=property_data['nr_floors'],
            type_of_heating=property_data['type_of_heating'],
            condition_=property_data['condition_'],
            description=property_data['description']
        )
        db.session.add(new_inside)
        db.session.commit()

        new_infrastructure=Infrastructure(
            id_property=property_id,
            shop_distance=property_data['shop_distance'],
            park_distance=property_data['park_distance'],
            playground_distance=property_data['playground_distance'],
            kindergarden_distance=property_data['kindergarden_distance'],
            school_distance=property_data['school_distance'],
            bicycle_rack=property_data['bicycle_rack'],
            car_parking_space=property_data['car_parking_space'],
        )
        db.session.add(new_infrastructure)
        db.session.commit()

        new_room=Room(
            id_property=property_id,
            id_room=property_data['id_room'],
            room_metrage=property_data['room_metrage'],
            
        )
        db.session.add(new_room)
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
        room.id_room=property_data['id_room']
        room.room_metrage=property_data['room_metrage']
        db.session.commit()
        return Response("Company data updated", status=204, mimetype='application/json')
    

    def get_all_properties(self, properties):
        return jsonify([{
                        'id_property':property.id_property,
                        #'id_owner': properties.id_owner,
                        'title' : property.title,
                        'price' : property.price,
                        'square_metrage' : property.square_metrage,
                        'finishing_standard' : property.finishing_standard,
                        #'condition' : property.condition,
                        'market' : property.market,
                        'publication_date': property.publication_date,
                        'p_p_meter': property.p_p_meter,
                        'sponsored': property.sponsored
                        
                    } for property in properties])
    
    def get_property(self, property, address, photo, inside, infrastructure, room ):
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
