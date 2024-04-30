from models import db, User

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
    
    def add_user(self, user_data):
        new_user = User(
            name=user_data['name'],
            surname=user_data['surname'],
            phone_number=user_data['phone_number'],
            password=user_data['password'],
            email=user_data['email'],
            usertype=user_data['usertype']
        )
        db.session.add(new_user)
        db.session.commit()

    def patch_user(self, user_data):
        pass