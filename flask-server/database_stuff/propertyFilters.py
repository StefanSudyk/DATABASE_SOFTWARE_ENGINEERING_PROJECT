from models import *


#filtrowanie po cenie - wyswietla tylko properties z zakresu ceny

def filter_by_price(query, price_from, price_to):
    return query.filter(Property.price.between(price_from, price_to))

#filtrowanie po rozmiarze property

def filter_by_square_metrage(query, square_metrage_from, square_metrage_to):
    return query.filter(Property.square_metrage.between(square_metrage_from, square_metrage_to))

#filtrowanie po poziomie wykończenia

def filter_by_condition(query, condition):
    return query.join(Inside).filter(Inside.condition_ == condition)

#filtrowanie po ilosci pokoi

def filter_by_nr_rooms(query, nr_rooms):
    return query.join(Inside).filter(Inside.nr_rooms == nr_rooms)

#filtrowanie po: kraj-wymagane , miasto - opcjonalne, ulica -opcjonalne

def filter_by_address(query, country, locality=None, street=None, district=None):
    query = query.join(Address).filter(Address.county == country)
    if locality:
        query = query.filter(Address.locality == locality)
    if street:
        query = query.filter(Address.street == street)
    if district:
        query = query.filter(Address.district == district)
    return query

def filter_by_district(query, district):
    
    return query.join(Address).filter(Address.district == district)

def filter_by_region(query, region):
    
    return query.join(Address).filter(Address.region == region)
#filtrowanie po finishing standard

def filter_by_finishing_standard(query, finishing_standard):
    return query.filter_by(finishing_standard=finishing_standard)

    
#filtrowanie po użytkowniku

def filter_by_user(query, id_user):
    return query.filter(Property.id_owner == id_user)

def filter_by_locality(query, locality):
    return query.join(Address).filter(Address.locality == locality)

# filtrowanie po ilości pięter
def filter_by_nr_floors(query, nr_floors):
    return query.join(Inside).filter(Inside.nr_floors == nr_floors)


# filtrowanie po miejscu parkingowym
def filter_by_car_parking_space(query, car_parking_space):
    return query.join(Infrastructure).filter(Infrastructure.car_parking_space == car_parking_space)


# filtrowanie po typie ogrzewania
def filter_by_type_of_heating(query, type_of_heating):
    return query.join(Inside).filter(Inside.type_of_heating == type_of_heating)


# filtrowanie po rynku (primary/secondary)
def filter_by_market(query, market):
    return query.filter(Property.market == market)


# filtrowanie po ilości łazienek
def filter_by_nr_bathrooms(query, nr_bathrooms):
    return query.join(Inside).filter(Inside.nr_bathrooms == nr_bathrooms)


# filtrowanie po ilości garaży
def filter_by_nr_garages(query, nr_garages):
    return query.join(Inside).filter(Inside.nr_garages == nr_garages)


# filtrowanie po ilości balkonów
def filter_by_nr_balconies(query, nr_balconies):
    return query.join(Inside).filter(Inside.nr_balconies == nr_balconies)

