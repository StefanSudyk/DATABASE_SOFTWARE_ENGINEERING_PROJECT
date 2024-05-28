from flask import Blueprint, render_template, url_for, request, redirect, session, flash
import requests
from models import User, Company
from werkzeug.security import check_password_hash
from flask_login import login_user, logout_user, current_user

base = "http://127.0.0.1:5000/"

auth = Blueprint('auth', __name__, template_folder="templates", static_folder="static")




@auth.route('/login', methods=["POST", "GET"])
def login():
    if request.method == "POST":
        phonenumber = request.form["phnum"]
        password = request.form["pswrd"]
        #tu przechwycone rzeczy do logowania

        user = User.query.filter_by().first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged successfully', category='success')
                login_user(user, remember=True)
                return redirect('views.user')
            else:
                flash('Incorrect apssword, try again.', category='error')
        else:
            flash("Phone number doesn't exist, try again.", category='error')

        return redirect(url_for("views.user"))
    else:
        if "phonenumber" in session:
            return redirect(url_for("views.user"))

        return render_template('login.html', user=current_user)


@auth.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('login.html'))

@auth.route('/signup', methods=["POST", "GET"])
def signup():
    filled_form_correctly = False  # trzeba będzie sprawdzić czy użytkownik wklepał poprawnie dane

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

        new_user = User(
            name=name,
            surname=surname,
            phone_number=phonenumber,
            email=email,
            usertype=usertype,
            password=password,
            is_active=True
        )
        json_new_user = (new_user.serialize())

        response = requests.post(base + 'post', json=json_new_user)

        #login_user(new_user, remember=True)
        flash('Account created !', category='success')

        if usertype == "Company":
            return redirect(url_for("auth.companyinfo"))

        return redirect(url_for("views.user"))

    else:
        return render_template('signup.html')



@auth.route('/companyinfo', methods=["POST", "GET"])
def companyinfo():
    if request.method == "POST":
        cp_name = request.form["cnm"] #nazwa firmy
        REGON = request.form["reg"] 
        NIP = request.form["nip"]
        postal_code = request.form["pst"]
        street = request.form["strt"]
        city = request.form["city"]
        house_number = request.form["strtnum"]
        cp_type = request.form["cp_type"]  # typ firmy - deweloper lub biuro nieruchomości

        # sprawdzamy czy przechwycono dane z formularza

        print("cp_name: ", cp_name)
        print("REGON: ", REGON)
        print("NIP: ", NIP)
        print("postal code: ", postal_code)
        print("street: ", street)
        print("city: ", city)
        print("house_number: ", house_number)
        print("company type: ", cp_type)

        # przechwycone dane o firmie

        data = {
            'cp_name': cp_name,
            'REGON': REGON,
            'NIP': NIP,
            'postal_code': postal_code,
            'street': street,
            'city': city,
            'house_number': house_number,
            'cp_type': cp_type
        }

        response = requests.post(base + 'postcompany', json=data)

        if response.status_code == 401 or response.status_code == 501:
            message = response.json()["message"]
            flash(message, 'error')
            return redirect(url_for('auth.companyinfo'))

        flash("Dane o firmie zostały przypisane!", 'info')
        return redirect(url_for("views.user"))
    else:
        return render_template('companyinfo.html')
