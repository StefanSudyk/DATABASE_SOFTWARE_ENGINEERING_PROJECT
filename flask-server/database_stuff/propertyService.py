from datetime import datetime
from flask import session
from models import *
from sqlalchemy import select

class PropertyService:
    
    
    def is_address_unique(self, county,region,district,locality,street,postal_code,house_number):
        # Sprawdzenie, czy istnieje adres o podanym numerze domu w bazie danych
        if not(Address.query.filter_by(county=county).first() and
                Address.query.filter_by(region=region).first() and
                Address.query.filter_by(district=district).first() and
                Address.query.filter_by(locality=locality).first() and
                Address.query.filter_by(street=street).first() and
                Address.query.filter_by(postal_code=postal_code).first() and
                Address.query.filter_by(house_number=house_number).first() ):
            return False
        return True

    
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
            condition=property_data['condition'],
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