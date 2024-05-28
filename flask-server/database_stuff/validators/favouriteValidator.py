import re
from flask_restful import abort,Resource
from service.favouriteService import get_favourite
class FavouriteValidation(Resource):
    def cp_name_validation(self, id_property):
        fav=FAV
        if Favourite:
            return True
        else:
            abort(401, message="Enter a valid company name")
            return False