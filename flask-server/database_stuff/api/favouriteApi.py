from flask_restful import abort
from flask import jsonify, Response
from flask_restful import Resource, reqparse, fields, marshal_with
from service.favouriteService import *
from validators.favouriteValidator import *
from time import sleep

class PostFavourite(Resource):
    def post(self,id_user,id_property):
        favourite_service = FavouriteService()
        favval=FavouriteValidation()
        
        if not favval.is_favourite(id_user,id_property):
            favourite_service.addFavorite(id_user,id_property)
            return Response("Favourite added", status=201, mimetype='application/json')
        else:
            # Punish user for spam
            #sleep(99999)
            return Response("what? ", status=401, mimetype='application/json')
            
    
class DeleteFavourite(Resource):
    def delete(self,id_user,id_property):
        favourite_service = FavouriteService
        return favourite_service.delete_favourite(self,id_user,id_property)
    
class GetUserFavourite(Resource):
    def get(self,id_user):
        favourite_service = FavouriteService
        fav = favourite_service.get_favourite(self,id_user)
        return fav