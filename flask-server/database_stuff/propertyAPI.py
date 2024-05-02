from flask import jsonify, Response
from flask_restful import Resource, reqparse, fields, marshal_with
from models import *
from propertyService import *
import requests

resource_postproperty_fields = {
    'title' : fields.String,
    'price' : fields.String,
    'square_metrage' : fields.String,
    'finishing_standard' : fields.String,
    'condition' : fields.String,
    'market' : fields.String,
    
}

class PostProperty(Resource):

    @marshal_with(resource_postproperty_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str, required=True, help='Title is essential')
        parser.add_argument('price', type=str, required=True, help='Price is essential')
        parser.add_argument('square_metrage', type=str, required=True, help='Square metrage is essential')
        parser.add_argument('finishing_standard', type=str, required=True, help='Finishing standard is essential')
        parser.add_argument('condition', type=str, required=True, help='condition again is essential')
        parser.add_argument('market', type=str, required=True, help='market is essential')
        args = parser.parse_args()
        print(args)

        
        is_ok = True

        if not args['title'].isalpha():
            is_ok = False
            print("Title must contain only letters")
            return "Title must contain only letters",401

        if is_ok:
            propertyservice=PropertyService()
            propertyservice.add_property(args)
            return Response("property added", status=201, mimetype='application/json')
        else:
            return Response("something went wrong", status=500, mimetype='application/json')
