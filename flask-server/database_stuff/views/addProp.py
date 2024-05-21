from flask import Blueprint, render_template, url_for, request, redirect, session,flash
from app import db
import requests
from models import Address, Photo
from sqlalchemy import select
addProp = Blueprint('addProp', __name__, template_folder="templates", static_folder="static")
base = "http://127.0.0.1:5000/"

@addProp.route('/addPhoto', methods=["POST", "GET"])
def addPhoto():
    if request.method == 'POST':
        photo = request.files["photo"]
        description_photo = request.form['desc']
        id_property = 1

        new_photo = Photo(
            id_property=id_property,
            address_photo=None,
            description_photo=description_photo
        )

    else:
        return render_template('addProp.html')

@addProp.route('/addProp', methods=["POST", "GET"])
def addProperty():
    
    if request.method == "POST":
        #property
        title = request.form["title"]
        price = request.form["price"]
        square_metrage = request.form["square_metrage"]
        finishing_standard = request.form["finishing_standard"]
        #condition = request.form["condition"]
        market = request.form["market"]
        #address
        county = request.form["county"]
        region = request.form["region"]
        district = request.form["district"]
        locality = request.form["locality"]
        street = request.form["street"]
        postal_code = request.form["postal_code"]
        house_number = request.form["house_number"]
        coordinates = request.form["coordinates"]
        #Photo
        #address_photo = request.form["address_photo"]
        #description_photo = request.form["description_photo"]
        #Inside
        nr_rooms = request.form["nr_rooms"]
        nr_bathrooms = request.form["nr_bathrooms"]
        basement = request.form["basement"]
        attic = request.form["attic"]
        nr_garages = request.form["nr_garages"]
        nr_balconies = request.form["nr_balconies"]
        nr_floors = request.form["nr_floors"]
        type_of_heating = request.form["type_of_heating"]
        condition_ = request.form["condition_"]
        description = request.form["description"]
        #infrastructure
        shop_distance = request.form["shop_distance"]
        park_distance = request.form["park_distance"]
        playground_distance = request.form["playground_distance"]
        kindergarden_distance = request.form["kindergarden_distance"]
        school_distance = request.form["school_distance"]
        bicycle_rack = request.form["bicycle_rack"]
        car_parking_space = request.form["car_parking_space"]
        #Room
        id_room = request.form["id_room"]
        room_metrage = request.form["room_metrage"]

        print(title)
        print(price)
        print(square_metrage)
        print(finishing_standard)
        #print(condition)
        print(market)
        data = {
        'title' : title,
        'price' : price,
        'square_metrage' : square_metrage,
        'finishing_standard' : finishing_standard,
        #'condition' : condition,
        'market' : market,
        'sponsored':0,

        'county':county,
        'region':region,
        'district':district,
        'locality':locality,
        'street':street,
        'postal_code':postal_code,
        'house_number':house_number,
        'coordinates':coordinates,

        #'address_photo':address_photo,
        #'description_photo':description_photo,
        
        'nr_rooms':nr_rooms,
        'nr_bathrooms':nr_bathrooms,
        'basement':basement,
        'attic':attic,
        'nr_garages':nr_garages,
        'nr_balconies':nr_balconies,
        'nr_floors':nr_floors,
        'type_of_heating':type_of_heating,
        'condition_':condition_,
        'description':description,

        'shop_distance':shop_distance,
        'park_distance':park_distance,
        'playground_distance':playground_distance,
        'kindergarden_distance':kindergarden_distance,
        'school_distance':school_distance,
        'bicycle_rack':bicycle_rack,
        'car_parking_space':car_parking_space,

        'id_room':id_room,
        'room_metrage':room_metrage

        }
        response = requests.post(base + 'postProperty', json=data)
        if response.status_code == 401 or response.status_code == 501:
            message = response.json()["message"]
            flash(message, 'error')
            return redirect(url_for('auth.companyinfo'))
        return redirect(url_for("views.index"))
    else:
        return render_template('addProp.html')
