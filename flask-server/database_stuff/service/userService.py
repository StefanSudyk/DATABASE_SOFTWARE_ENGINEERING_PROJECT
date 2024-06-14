
from models import db, User
from flask import jsonify
from werkzeug.security import check_password_hash

class UserService:
    def is_email_unique(self, email):
        # Sprawdzenie, czy istnieje użytkownik o podanym adresie e-mail w bazie danych
        existing_user = User.query.filter_by(email=email).first()
        print(existing_user)
        return existing_user is None
    
    def is_phone_number_unique(self, phone_number):
        # Sprawdzenie, czy istnieje użytkownik o podanym numerze telefonu w bazie danych
        existing_user = User.query.filter_by(phone_number=phone_number).first()
        print(existing_user)
        return existing_user is None
    
    def add_user(self, user_data, hashed_password):
        new_user = User(
            name=user_data['name'],
            surname=user_data['surname'],
            phone_number=user_data['phone_number'],
            password=hashed_password,
            email=user_data['email'],
            usertype=user_data['usertype'],
            # to trzeba dodać
        )
        db.session.add(new_user)
        db.session.commit()

    def patch_user(self):
        db.session.commit()
    
    def authenticate(self, phone_number, password):
        user = User.query.filter_by(phone_number=phone_number).first()
        if user and check_password_hash(user.password, password):
            return user
        return None

    def delete_user(self, user):
        db.session.delete(user)
        db.session.commit()

    def get_all_users(self, users):
        return jsonify([{
            'id_user': user.id_user,
            'id_company': user.id_company,
            'name': user.name,
            'surname': user.surname,
            'phone_number': user.phone_number,
            'email': user.email,
            'usertype': user.usertype,
            #'properties': user.properties
        } for user in users])

    def get_user(self, user):
        return jsonify({
            'id_user': user.id_user,
            'id_company': user.id_company,
            'name': user.name,
            'surname': user.surname,
            'phone_number': user.phone_number,
            'email': user.email,
            'usertype': user.usertype,
            #'properties': user.properties
        })
