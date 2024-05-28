from flask_restful import abort
from flask import jsonify, Response
from flask_restful import Resource, reqparse, fields, marshal_with
from service.favouriteService import *

class PostFavourite(Resource):
    def post(self,id_property):
        favourite_service = FavouriteService()
        favourite_service.addFavorite(id_property)
        return Response("Favourite added", status=201, mimetype='application/json')
    
class DeleteFavourite(Resource):
    def delete(self, id_property):
        favourite_service = FavouriteService
        return favourite_service.delete_favourite(id_property)
    
class GetUserFavourite(Resource):
    def get(self):
        favourite_service = FavouriteService
        company = favourite_service.get_favourite()
        return company