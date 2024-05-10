from models import db, Property, Address, Photo, Inside, Infrastructure,Room
from datetime import datetime
from flask import session

class PropertyService:
    
    def is_address_unique(self, house_number):
        # Sprawdzenie, czy istnieje adres o podanym numerze domu w bazie danych
        existing_address = Address.query.filter_by(house_number=house_number).first()
        print(existing_address)
        return existing_address is None

    
    def add_property(self, property_data):
        properties = Property.query.all()
        listaid=[]
        for prop in properties:
            listaid.append(prop.id_property)
        property_id1=max(listaid)
        property_id=property_id1+1
        publication_date=datetime.today()
        formated_date = publication_date.strftime('%Y-%m-%d')
        p_p_meter=property_data['price']/property_data['square_metrage']
        new_property = Property(
            id_property=property_id,
            id_owner=session['id_user'],
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
            layground_distance=property_data['playground_distance'],
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