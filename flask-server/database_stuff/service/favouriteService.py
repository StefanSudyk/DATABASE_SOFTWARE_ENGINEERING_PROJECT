from models import db,Favourite
from flask import session,Response,jsonify
from flask_login import current_user
from sqlalchemy import select
from models import User
class FavouriteService:
    def addFavorite(self,id_user, id_property):
        favourite = Favourite(
        id_user=id_user,
        id_property=id_property
        )
        db.session.add(favourite)
        db.session.commit()

    def delete_favourite(self,id_user,id_property):
        try:
            id = id_user
            favourite = Favourite.query.filter_by(id_property=id_property, id_user=id).first()
            db.session.delete(favourite)
            db.session.commit()
            return Response("Favourite deleted", status=200, mimetype='application/json')
        except Exception as e:
            return Response('Error: no favourite to delete. '+str(e), status=501, mimetype='application/json')
        
    def get_favourite(self,id_user):
        id = id_user
        try:
            id_list=[]
            favourites = Favourite.query.filter_by(id_user=id).all() 
            for i in favourites:
                id_list.append(i.id_property)
            return id_list
        except Exception as e:
            return Response('Error: no favourite to delete. '+str(e), status=501, mimetype='application/json')
        
    def getfavourite(self,id_user, id_property):
        fav = Favourite.query.filter_by(id_property=id_property, id_user=id_user).first()
        if fav==None:
            return False
        else:
            return fav