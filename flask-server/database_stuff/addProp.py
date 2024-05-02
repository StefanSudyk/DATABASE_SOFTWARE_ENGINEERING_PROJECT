from flask import Blueprint, render_template, url_for, request, redirect, session
from app import db
import requests
addProp = Blueprint('addProp', __name__, template_folder="templates", static_folder="static")
base = "http://127.0.0.1:5000/"
@addProp.route('/addProp', methods=["POST", "GET"])
def addProperty():
    
    if request.method == "POST":
        title = request.form["tit"]
        price = request.form["pc"]
        square_metrage = request.form["sqm"]
        finishing_standard = request.form["fs"]
        condition = request.form["cond"]
        market = request.form["mark"]

        print(title)
        print(price)
        print(square_metrage)
        print(finishing_standard)
        print(condition)
        print(market)
        
        data = {
        'title' : title,
        'price' : price,
        'square_metrage' : square_metrage,
        'finishing_standard' : finishing_standard,
        'condition' : condition,
        'market' : market,
        
        }
        response = requests.post(base + 'postProperty', json=data)
        return redirect(url_for("views.index"))
    else:
        return render_template('addProp.html')
