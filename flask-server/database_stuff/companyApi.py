from flask import jsonify, Response
from flask_restful import Resource, reqparse, fields, marshal_with
from models import *
from companyService import CompanyService
import re
from flask_restful import abort

resource_postcompany_fields = {
    'cp_name': fields.String,
    'REGON': fields.String,
    'NIP': fields.String,
    'postal_code': fields.String,
    'street': fields.String,
    'city': fields.String,
    'house_number': fields.String,
    'cp_type': fields.String
}

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

class PostCompany(Resource):
    @marshal_with(resource_postcompany_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('cp_name', type=str, required=True, help='Company name is essential')
        parser.add_argument('REGON', type=str, required=True, help='REGON is essential')
        parser.add_argument('NIP', type=str, required=True, help='NIP is essential')
        parser.add_argument('postal_code', type=str, required=True, help='Postal code is essential')
        parser.add_argument('street', type=str, required=True, help='Street is essential')
        parser.add_argument('city', type=str, required=True, help='City is essential')
        parser.add_argument('house_number', type=str, required=True, help='House number is essential') 
        parser.add_argument('cp_type', type=str, required=True, help='Choose a company type') 

        args = parser.parse_args()
        validator = CompanyValidation()
        
        if (validator.cp_name_validation(args['cp_name']) and
            validator.regon_validation(args['REGON']) and
            validator.nip_validation(args['NIP']) and
            validator.postal_code_validation(args['postal_code']) and
            validator.street_validation(args['street']) and
            validator.city_validation(args['city']) and
            validator.house_number_validation(args['house_number']) and
            validator.cp_type_validation(args['cp_type'])):

            company_service = CompanyService()
            company_service.add_company(args)
            return Response("company added", status=201, mimetype='application/json')
        
        else:
            abort(501, message="Something went wrong")

class GetCompany(Resource):

    def get(self, id_company):
        company_service = CompanyService()
        company = company_service.get_company(id_company)
        
        return company
    
class DeleteCompany(Resource):

    def delete(self, id_company):
        company_service = CompanyService()
        return company_service.delete_company(id_company)
    
class UpdateCompany(Resource):

    @marshal_with(resource_postcompany_fields)
    def put(self, id_company):
        parser = reqparse.RequestParser()
        parser.add_argument('cp_name', type=str, required=True, help='Company name is essential')
        parser.add_argument('REGON', type=str, required=True, help='REGON is essential')
        parser.add_argument('NIP', type=str, required=True, help='NIP is essential')
        parser.add_argument('postal_code', type=str, required=True, help='Postal code is essential')
        parser.add_argument('street', type=str, required=True, help='Street is essential')
        parser.add_argument('city', type=str, required=True, help='City is essential')
        parser.add_argument('house_number', type=str, required=True, help='House number is essential') 
        parser.add_argument('cp_type', type=str, required=True, help='Choose a company type') 

        args = parser.parse_args()
        validator = CompanyValidation()
        
        if (validator.cp_name_validation(args['cp_name']) and
            validator.regon_validation(args['REGON']) and
            validator.nip_validation(args['NIP']) and
            validator.postal_code_validation(args['postal_code']) and
            validator.street_validation(args['street']) and
            validator.city_validation(args['city']) and
            validator.house_number_validation(args['house_number']) and
            validator.cp_type_validation(args['cp_type'])):

            company_service = CompanyService()
            return company_service.update_company(id_company, args)
        
        else:
            abort(501, message="Something went wrong")
