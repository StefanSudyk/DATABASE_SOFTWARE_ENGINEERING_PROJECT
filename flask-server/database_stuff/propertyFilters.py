from models import Property


#filtrowanie po cenie - wyswietla tylko properties z zakresu ceny

def filter_by_price(price_from, price_to):
    properties = Property.query.filter(Property.price.between(price_from, price_to)).all()
    return properties