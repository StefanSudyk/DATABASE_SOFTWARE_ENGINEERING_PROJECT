from flask import jsonify, Response
from flask_restful import Resource, reqparse
from models import *



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
                users = User.query.all()
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
                
        

class PostUser(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help='First name is essential')
        parser.add_argument('surname', type=str, required=True, help='Last name is essential')
        parser.add_argument('phone_number', type=str, required=True, help='Phone numver is essential')
        parser.add_argument('password', type=str, required=True, help='Password is essential')
        parser.add_argument('email', type=str, required=True, help='Email is essential')
        parser.add_argument('usertype', type=str, required=True, help='Select user type') # TODO - ogarnac jak wybierac typ enum, narazie daje ze required=False
        args = parser.parse_args()
        
        new_user = User(
            name=args['name'],
            surname=args['surname'],
            phone_number=args['phone_number'],
            password=args['password'],
            email=args['email'],
            usertype=args['usertype']
        )
        db.session.add(new_user)
        db.session.commit()

        return Response("user added", status=201, mimetype='application/json')


class DeleteUser(Resource):
    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return Response("user deleted", status=200, mimetype='application/json')
