from flask_restful import abort
from flask import jsonify, Response
from flask_restful import Resource, reqparse, fields, marshal_with
from service.favouriteService import *
from validators.favouriteValidator import *
from time import sleep

class PostFavourite(Resource):
    def post(self,id_property):
        favourite_service = FavouriteService()
        favval=FavouriteValidation()
        
        if favval.is_favourite(id_property):
            favourite_service.addFavorite(id_property)
            return Response("Favourite added", status=201, mimetype='application/json')
        else:
            # Punish user for spam
            sleep(99999)
            
    
class DeleteFavourite(Resource):
    def delete(self, id_property):
        favourite_service = FavouriteService
        return favourite_service.delete_favourite(id_property)
    
class GetUserFavourite(Resource):
    def get(self):
        favourite_service = FavouriteService
        fav = favourite_service.get_favourite()
        return fav