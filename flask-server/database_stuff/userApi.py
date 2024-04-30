from flask import jsonify, Response
from flask_restful import Resource, reqparse, fields, marshal_with, abort
from models import *
from userService import UserService
import re

resource_postuser_fields = {
    'name': fields.String,
    'surname': fields.String,
    'phone_number': fields.String,
    'password': fields.String,
    'email': fields.String,
    'usertype': fields.String
}
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






class GetUser(Resource):
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return jsonify({
            'id_user': user.id_user,
            'id_company': user.id_company,
            'name': user.name,
            'surname': user.surname,
            'phone_number': user.phone_number,
            'email': user.email,
            'usertype': user.usertype,
            'properties': user.properties
        })


class GetAllUsers(Resource):
    def get(self):
        try:
            users = User.query.all()
            if users == []:
                return Response("No user", status=500, mimetype='application/json')
            return jsonify([{
                'id_user': user.id_user,
                'id_company': user.id_company,
                'name': user.name,
                'surname': user.surname,
                'phone_number': user.phone_number,
                'email': user.email,
                'usertype': user.usertype,
                'properties': user.properties
            } for user in users])
        except Exception as e:
            return Response('Error: no users. ' + str(e), status=501, mimetype='application/json')


class PostUser(Resource):

    @marshal_with(resource_postuser_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help='First name is essential')
        parser.add_argument('surname', type=str, required=True, help='Last name is essential')
        parser.add_argument('phone_number', type=str, required=True, help='Phone numver is essential')
        parser.add_argument('password', type=str, required=True, help='Password is essential')
        parser.add_argument('password_repeat', type=str, required=True, help='Entering password again is essential')
        parser.add_argument('email', type=str, required=True, help='Email is essential')
        parser.add_argument('usertype', type=str, required=True, help='Select user type')
        args = parser.parse_args()
        print(args)

        ### WALIDACJA ###
        validator = Validation()
        user_service = UserService()

        check = validator.name_surname_validation(args['name'])
        print(check, "name")
        check = validator.name_surname_validation(args['surname'])
        print(check, "surname")
        check = validator.phone_number_validation(args['phone_number'])
        print(check, "number")
        check = validator.password_len_validation(args['password'])
        print(check, "pass len")
        check = validator.compare_password_validation(args['password'], args['password_repeat'])
        print(check, "compare")
        check = validator.email_validation(args['email'])
        print(check, "email val")
        check = validator.is_email_unique(args['email'])
        print(check, "email uniq")
        check = validator.is_phone_number_unique(args['phone_number'])
        print(check, "number uniq")

        if check:
            user_service.add_user(args)
            return Response("user added", status=201, mimetype='application/json')
        else:
            abort(501, message="something went wrong")


class EditUserInformation(Resource):
    """
        :parameter action - name/surname/phone_number/password/email/usertype
    """

    def patch(self, user_id, action: str):
        user = User.query.get_or_404(user_id)
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('surname', type=str)
        parser.add_argument('phone_number', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('usertype', type=enum)

        args = parser.parse_args()

        match action:
            case "name":
                user.name = args['name']
            case "surname":
                user.surname = args['surname']
            case "phone_number":
                user.phone_number = args['phone_number']
            case "password":
                user.password = args['password']
            case "email":
                user.email = args['email']
            case "usertype":
                user.usertype = args['usertype']
            case _:
                return Response("Invalid action", status=400, mimetype='application/json')

        db.session.commit()
        return Response("User data edited", status=200, mimetype='application/json')


class DeleteUser(Resource):
    def delete(self, user_id):
        try:
            user = User.query.get_or_404(user_id)
            db.session.delete(user)
            db.session.commit()
            return Response("user deleted", status=200, mimetype='application/json')
        except Exception as e:
            return Response('Error: no user to delete. ' + str(e), status=501, mimetype='application/json')
