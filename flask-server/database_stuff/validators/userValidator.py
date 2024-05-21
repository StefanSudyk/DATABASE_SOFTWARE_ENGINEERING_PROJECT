from flask_restful import Resource, reqparse, fields, marshal_with, abort
from service.userService import *
import re
class Validation(Resource):
    """
    Validation class was created to encapsule and make those methods more universal.
    """
    def name_surname_validation(self, name_surname):
        if not name_surname.isalpha():
            abort(401, message="First name must contain only letters")
            return False
        return True

    def email_validation(self, email):
        if '@' not in email:
            abort(401, message="Invalid email address")
            return False
        return True


    def phone_number_validation(self, phone_number):
        if not re.match(r'^\d{9}$', phone_number):
            abort(401, message="Phone number is not correct, use format 123456789.")
            return False
        return True


    def password_len_validation(self, password):
        if len(password) < 8:
            abort(401, message="Password must be at least 8 characters long")
            return False
        return True


    def compare_password_validation(self, password, repeat_password):
        if password != repeat_password:
            abort(401, message="Passwords have to match")
            return False
        return True

    def usertype_validation(self, usertype):
        usertype_list = ['Admin', 'User', 'Company']
        if usertype not in usertype_list:
            abort(401, message="Invalid usertype")
            return False
        return True

    def is_email_unique(self, email):
        user_service = UserService()
        if not user_service.is_email_unique(email):
            abort(401, message="There is an account with given email")
            return False
        return True

    def is_phone_number_unique(self, phone_number):
        user_service = UserService()
        if not user_service.is_phone_number_unique(phone_number):
            abort(401, message="There is an account with given phone number")
            return False
        return True
