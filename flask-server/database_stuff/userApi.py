from flask import jsonify, Response
from flask_restful import Resource, reqparse, fields, marshal_with
from models import *
from userService import UserService
import re
from flask_restful import abort

resource_postuser_fields = {
    'name': fields.String,
    'surname': fields.String,
    'phone_number': fields.String,
    'password': fields.String,
    'email': fields.String,
    'usertype': fields.String
}

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
                    return Response('Error: no users. '+str(e), status=501, mimetype='application/json')
                
        

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
        is_ok = True
        user_service = UserService()

        password = args['password']
        password_repeat = args['password_repeat']
        print("HASŁO: ", password)
        print("HASŁO: ", password_repeat)

        if not args['name'].isalpha():
            is_ok = False
            abort(401, message="First name must contain only letters")
            
        if not args['surname'].isalpha():
            is_ok = False
            abort(401, message="Surname must contain only letters")
        
        if not re.match(r'^\d{9}$', args['phone_number']):
            is_ok = False
            abort(401, message="Phone number is not correct, use format 123456789.")

        if len(password) < 8:
            is_ok = False
            abort(401, message="Password must be at least 8 characters long")
        
        if password != password_repeat:
            is_ok = False
            abort(401, message="Passwords have to match")
             
        if '@' not in args['email']:
            is_ok = False
            abort(401, message="Invalid email address")

        if not user_service.is_email_unique(args['email']):
            is_ok = False
            abort(401, message="There is an account with given email")

        if not user_service.is_phone_number_unique(args['phone_number']):
            is_ok = False
            abort(401, message="There is an account with given phone number")
        
        if is_ok:
            user_service.add_user(args)
            return Response("user added", status=201, mimetype='application/json')
        else:
            abort(501, message="something went wrong")

class DeleteUser(Resource):
    def delete(self, user_id):
        try:
            user = User.query.get_or_404(user_id)
            db.session.delete(user)
            db.session.commit()
            return Response("user deleted", status=200, mimetype='application/json')
        except Exception as e:
            return Response('Error: no user to delete. '+str(e), status=501, mimetype='application/json')
