from flask import jsonify, Response
from flask_restful import Resource, reqparse
from models import *


class GetUser(Resource):
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return jsonify({
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone_number': user.phone_number
        })


class GetAllUsers(Resource):
    def get_all_users(self):
        users = User.query.all()
        return jsonify([{
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone_number': user.phone_number
        } for user in users])


class PostUser(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('first_name', type=str, required=True, help='First name is essential')
        parser.add_argument('last_name', type=str, required=True, help='Last name is essential')
        parser.add_argument('phone_number', type=str, required=True, help='Phone numver is essential')
        parser.add_argument('password', type=str, required=True, help='Password is essential')

        args = parser.parse_args()

        new_user = User(
            first_name=args['first_name'],
            last_name=args['last_name'],
            phone_number=args['phone_number'],
            password=args['password']
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
