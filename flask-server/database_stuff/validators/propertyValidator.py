import re
from flask_restful import abort,Resource
from service.propertyService import PropertyService
def is_float(value):
            try:
                float(value)
                return True
            except ValueError:
                return False
class propertyValidation(Resource):
    
    
    def postal_validation(self, postal_code):
        
        if not re.match(r'^\d{2}-\d{3}$', postal_code):
            abort(401, message="Enter a correct Postal Code 5 digits")
            return False
        else:
            return True
        
    def house_nr_validation(self, house_number):
        if len(house_number) > 6 or not house_number[0].isdigit():
            abort(401, message="Enter a correct house number (maximum 6 characters, first character must be a digit)")
            return False
        else:
            return True

        
    def address_unique(self,address):
        propertyservice=PropertyService()
        alladd=propertyservice.get_all_addresses()
        for i in alladd:
            if address.country == i.country:
                abort(401, message="Address must be unique")
                return False
        return True

    # def title_validation(self, title):
    #     if not title.isalpha():
    #         abort(401, message="Enter a correct house number (up to 6 digits")
    #         return False
    #     else:
    #         return True
    def price_validation(self, price):
        if not is_float(price):
            abort(401, message="Enter a correct price")
            return False
        else:
            return True
    def sq_metrage_validation(self, square_metrage):    
        if not is_float(square_metrage):
            abort(401, message="Enter a correct square metrage")
            return False
        else:
            return True
    def room_metrage_validation(self, room_metrage):        
        if not is_float(room_metrage):
            abort(401, message="Enter a correct room metrage")
            return False
        else:
            return True
