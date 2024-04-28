from flask import Blueprint, render_template, url_for, request, redirect, session, jsonify
from app import db
import requests

base = "http://127.0.0.1:5000/"

auth = Blueprint('auth', __name__, template_folder="templates", static_folder="static")

@auth.route('/login', methods=["POST", "GET"])
def login():
    if request.method == "POST":
        phonenumber = request.form["phnum"]
        password = request.form["pswrd"]
        #tu przechwycone rzeczy do logowania

        print("nr tel: ", phonenumber)
        print("hasło: ", password)

        session.permanent = True
        session["phonenumber"] = phonenumber

        return redirect(url_for("views.user"))
    else:
        if "phonenumber" in session:
            return redirect(url_for("views.user"))
        
        return render_template('login.html')


@auth.route('/logout')
def logout():
    if "phonenumber" in session:
        session.pop("phonenumber", None)
        return render_template('logout.html')
    else:
        return redirect(url_for("views.index"))
    

@auth.route('/signup', methods=["POST", "GET"])
def signup():
    filled_form_correctly = False #trzeba będzie sprawdzić czy użytkownik wklepał poprawnie dane

    if request.method == "POST":
        name = request.form["nm"]
        surname = request.form["snm"]
        phonenumber = request.form["phnum"]
        email = request.form["email"]
        usertype = request.form["user_type"]
        password = request.form["pswrd"]
        password_repeat = request.form["pswrdag"]

        #sprawdzamy czy przechwycono dane z formularza
        print("name: ", name)
        print("surname: ", surname)
        print("phone number: ", phonenumber)
        print("email: ", email)
        print("usertype: ", usertype)
        print("password: ", password)
        print("password again: ", password_repeat)
    
        #przechywcone dane o uzytkowniku
        
        data = {
            'name': name,
            'surname': surname,
            'phone_number': phonenumber,
            'password': password,
            'password_repeat': password_repeat,
            'email': email,
            'usertype': usertype
        }
        
        response = requests.post(base + 'post', json=data)
        
        session["phonenumber"] = phonenumber

        if usertype == "Company":
            return redirect(url_for("auth.companyinfo"))

        return redirect(url_for("views.user"))
        
    else:
        return render_template('signup.html')


@auth.route('/signup/companyinfo', methods=["POST", "GET"])
def companyinfo():
    filled_form_correctly = True #trzeba będzie sprawdzić czy użytkownik wklepał poprawnie dane

    if request.method == "POST":
        cp_name = request.form["cnm"]
        REGON = request.form["reg"]
        NIP = request.form["nip"]
        postal_code = request.form["pst"]
        street = request.form["strt"]
        city = request.form["city"]
        house_number = request.form["strtnum"]
        cp_type = request.form["cp_type"]

        #sprawdzamy czy przechwycono dane z formularza
        print("cp_name: ", cp_name)
        print("REGON: ", REGON)
        print("NIP: ", NIP)
        print("postal code: ", postal_code)
        print("street: ", street)
        print("city: ", city)
        print("house_number: ", house_number)
        print("company type: ", cp_type)

        #przechwycone dane o firmie

        if filled_form_correctly:
            #przeslij do bazy i guess
            return redirect(url_for("views.user"))
        else:
            return render_template('companyinfo.html')
        
    else:
        return render_template('companyinfo.html')
