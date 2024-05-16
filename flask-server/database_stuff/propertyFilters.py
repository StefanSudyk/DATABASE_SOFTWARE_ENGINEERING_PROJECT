from models import Property


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

def filter_by_finishing_standard(finishing_standard):
    properties = Property.query.filter_by(finishing_standard=finishing_standard).all()
    return properties