import re
from flask_restful import abort,Resource
class CompanyValidation(Resource):
    def cp_name_validation(self, cp_name):
        if cp_name.strip() and not cp_name.isspace():
            return True
        else:
            abort(401, message="Enter a valid company name")
            return False

    def regon_validation(self, regon):
        if not re.match(r'^\d{9}$', regon):
            abort(401, message="Enter a correct REGON (9 digits)")
            return False
        else:
            return True

    def nip_validation(self, nip):
        if not re.match(r'^\d{10}$', nip):
            abort(401, message="Enter a correct NIP (10 digits)")
            return False
        else:
            return True

    def postal_code_validation(self, postal_code):
        if not re.match(r'^\d{2}-\d{3}$', postal_code):
            abort(401, message="Enter a correct postal code (XX-XXX)")
            return False
        else:
            return True
        
    def street_validation(self, street):
        if street.strip() and not street.isspace():
            return True
        else:
            abort(401, message="Enter a valid company street")
            return False
        
    def city_validation(self, city):
        if city.strip() and not city.isspace():
            return True
        else:
            abort(401, message="Enter a valid city")
            return False
        
    def house_number_validation(self, house_number):
        if house_number.strip() and not house_number.isspace():
            return True
        else:
            abort(401, message="Enter a valid house number")
            return False
        
    def cp_type_validation(self, cp_type):
        cp_type_list = ["Developer", "Estate agency"]
        if cp_type not in cp_type_list:
            abort(401, message="Invalid company type")
            return False
        return True