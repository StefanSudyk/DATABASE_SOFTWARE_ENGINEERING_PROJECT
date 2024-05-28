import re
from flask_restful import abort,Resource
from service.favouriteService import *
class FavouriteValidation(Resource):
    def is_favourite(self, id_property):
        fav=FavouriteService()
        fa= fav.get_favourite(id_property)
        if fa:
            return True
        else:
            return False