from models import Property, Inside, Address


#filtrowanie po cenie - wyswietla tylko properties z zakresu ceny

def filter_by_price(price_from, price_to):
    properties = Property.query.filter(Property.price.between(price_from, price_to)).all()
    return properties

#filtrowanie po rozmiarze property

def filter_by_square_metrage(square_metrage_from, square_metrage_to):
    properties = Property.query.filter(
    Property.square_metrage.between(square_metrage_from, square_metrage_to)).all()
    return properties

#filtrowanie po poziomie wykończenia

def filter_by_condition(condition):
    properties = Property.query.join(Inside).filter(Inside.condition_ == condition).all()
    return properties

#filtrowanie po ilosci pokoi

def filter_by_nr_rooms(nr_rooms):
    properties = Property.query.join(Inside).filter(Inside.nr_rooms == nr_rooms).all()
    return properties

#filtrowanie po: kraj-wymagane , miasto - opcjonalne, ulica -opcjonalne

def filter_by_address(country, locality=None, street=None, district = None):
    query = Property.query.join(Address).filter(Address.county == country)

    if locality:
        query = query.filter(Address.locality == locality)

    if street:
        query = query.filter(Address.street == street)
    
    if district:
        query = query.filter(Address.district == district)
    
    properties = query.all()
    return properties

#filtrowanie po finishing standard

def filter_by_finishing_standard(finishing_standard):

    properties = Property.query.filter_by(finishing_standard=finishing_standard).all()
    return properties

    
#filtrowanie po użytkowniku

def filter_by_user(id_user):
    properties = Property.query.filter(Property.id_owner==id_user).all()
    return properties

def filter_by_locality(locality):
    properties = Property.query.join(Address).filter(Address.locality == locality).all()
    return properties
