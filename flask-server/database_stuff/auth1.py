from flask import Blueprint, render_template, url_for, request, redirect, session, jsonify, flash
from app import db
import requests
from flask_login import login_user, login_required, current_user, logout_user
from models import User
from werkzeug.security import check_password_hash, generate_password_hash
from validators.userValidator import Validation


base = "http://127.0.0.1:5000/"

auth = Blueprint('auth', __name__, template_folder="templates", static_folder="static")



@auth.route('/loginview', methods=["POST", "GET"])
def login():
    if request.method == "POST":
        phonenumber = request.form["phnum"]
        password = request.form["pswrd"]
      
        #tu przechwycone rzeczy do logowania
        print("nr tel: ", phonenumber)
        print("hasło: ", password)
        
        data = {
            'phone_number': phonenumber,
            'password': password
        }

        response = requests.post("http://127.0.0.1:5000/login", json=data)
        print(response)
        return redirect(url_for('views.user'))      
    else:
        return render_template('login.html', user=current_user)


@auth.route('/logoutview')
@login_required
def logout():
    logout_user()
    flash('Logged out.', category='success')
    return redirect(url_for('auth.login'))


@auth.route('/signup', methods=["POST", "GET"])
def signup():
    if request.method == "POST":
        name = request.form["nm"]
        surname = request.form["snm"]
        phonenumber = request.form["phnum"]
        email = request.form["email"]
        usertype = request.form["user_type"]
        password = request.form["pswrd"]
        password_repeat = request.form["pswrdag"]

        '''
        jak będzie front to domyslnie będzie ustawienie usertype = private user
        '''
        user = User.query.filter_by(phone_number=phonenumber).first()       
       
        validator = Validation()
        
         # test walidacji]
        """ 
        print('name val:',validator.name_surname_validation(name))
        print('phone val:',validator.phone_number_validation(phonenumber))
        print('email val:',validator.email_validation(email))
        print('passw len val:',validator.password_len_validation(password))
        print('compare passw val:',validator.compare_password_validation(password, password_repeat))
        print('email uniq val:',validator.is_email_unique(email))
        print('phonenum uniq val:',validator.is_phone_number_unique(phone_number=phonenumber))"""
        
        # jak tu cos jest nie tak to wyrzuca w przegladarce unauthorized i kod bledu 401
        if (validator.name_surname_validation(name) and
            validator.name_surname_validation(surname) and
            validator.phone_number_validation(phonenumber) and
            validator.email_validation(email) and
            validator.is_email_unique(email) and
            validator.is_phone_number_unique(phonenumber) and
            validator.password_len_validation(password) and 
            validator.compare_password_validation(password, password_repeat)):
        

            hashed_password = generate_password_hash(password=password, method='pbkdf2:sha256')
            print("hash passw:", hashed_password)

            new_user = User(
                name=name,
                surname=surname,
                phone_number=phonenumber,
                password=hashed_password,
                email=email,
                usertype=usertype,
                is_active=False
            )
            print("new user name: ", new_user.name)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)

            print("Konto utworzone")
            flash('Account created!', category='success')
            return redirect(url_for('views.user'))
        
        else:
            print("validator wyrzuca")
            flash('Validation problem.', category='error')
            return redirect(url_for('views.signup'))
        
    return render_template('signup.html', user=current_user)
                    
                
        
        
        
      


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

