from models import User, db, Company
from flask import Response, jsonify 
from flask_login import current_user
from service.userService import UserService


class CompanyService:
    def add_company(self, company_data, id):
        new_company = Company(
            cp_name=company_data['cp_name'], #nazwa firmy
            REGON=company_data['REGON'],
            NIP=company_data['NIP'],
            postal_code=company_data['postal_code'],
            street=company_data['street'],
            city=company_data['city'],
            house_number=company_data['house_number'],
            cp_type=company_data['cp_type'] #typ firmy
        )
        
        db.session.add(new_company)
        db.session.commit()

        user_service = UserService()
        user = User.query.get_or_404(id)
        user.id_company = new_company.id_company
        user_service.patch_user()


        #tutaj pasowałoby przechwycić utworzone company id i przypisać je do
        #aktualnie zalogowanego użytkownika

    def delete_company(self, id_company):
        try:
            company = Company.query.get_or_404(id_company)
            db.session.delete(company)
            db.session.commit()
            return Response("Company deleted", status=200, mimetype='application/json')
        except Exception as e:
            return Response('Error: no company to delete. '+str(e), status=501, mimetype='application/json')
        
    def get_company(self, id_company):
        company = Company.query.get_or_404(id_company)
        return jsonify({
            'id_company': company.id_company, 
            'cp_name': company.cp_name,
            'REGON': company.REGON,
            'NIP': company.NIP,
            'postal_code': company.postal_code,
            'street': company.street,
            'city': company.city,
            'house_number': company.house_number,
            'cp_type': company.cp_type
        }) 
    
    def update_company(self, id_company, new_company_data):
        company = Company.query.get_or_404(id_company)

        company.cp_name = new_company_data['cp_name']
        company.REGON = new_company_data['REGON']
        company.NIP = new_company_data['NIP']
        company.postal_code = new_company_data['postal_code']
        company.street = new_company_data['street']
        company.city = new_company_data['city']
        company.house_number = new_company_data['house_number']
        company.cp_type = new_company_data['cp_type']
        
        db.session.commit()

        return Response("Company data updated", status=200, mimetype='application/json')
