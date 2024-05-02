from models import db, User

class PropertyService:
    def add_property(self, property_data):
        new_property = property(
            title=property_data['title'],
            price=property_data['price'],
            square_metrage=property_data['square_metrage'],
            finishing_standard=property_data[' finishing_standard'],
            condition=property_data['condition'],
            market=property_data['market']
        )
        db.session.add(new_property)
        db.session.commit()