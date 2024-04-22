from flask import Blueprint, render_template, url_for, request, redirect, session
from app import db

auth = Blueprint('auth', __name__, template_folder="templates", static_folder="static")

@auth.route('/login', methods=["POST", "GET"])
def login():
    if request.method == "POST":
        usr_phone = request.form["phnum"]
        usr_pswrd = request.form["pswrd"]
        #tu przechwycone rzeczy do logowania

        session.permanent = True
        session["usr_phnum"] = usr_phone

        return redirect(url_for("views.user"))
    else:
        if "usr_phnum" in session:
            return redirect(url_for("views.user"))
        
        return render_template('login.html')


@auth.route('/logout')
def logout():
    if "usr_phnum" in session:
        session.pop("usr_phnum", None)
        return render_template('logout.html')
    else:
        return redirect(url_for("views.index"))
    

@auth.route('/signup', methods=["POST", "GET"])
def signup():
    filled_form_correctly = False #trzeba będzie sprawdzić czy użytkownik wklepał poprawnie dane

    if request.method == "POST":
        usr_name = request.form["nm"]
        usr_surname = request.form["snm"]
        usr_phone = request.form["phnum"]
        usr_email = request.form["email"]
        usr_type = request.form["user_type"]
        usr_pswrd = request.form["pswrd"]
        usr_pswrdag = request.form["pswrdag"]
    
        if usr_pswrd == usr_pswrdag:
            filled_form_correctly = True

        #przechywcone dane o uzytkowniku

        if not filled_form_correctly:
            return render_template("signup.html")
        
        session["usr_phnum"] = usr_phone

        if usr_type == "company":
            return redirect(url_for("auth.companyinfo"))

        return redirect(url_for("views.user"))
        
    else:
        return render_template('signup.html')


@auth.route('/signup/companyinfo', methods=["POST", "GET"])
def companyinfo():
    filled_form_correctly = True #trzeba będzie sprawdzić czy użytkownik wklepał poprawnie dane

    if request.method == "POST":
        com_name = request.form["cnm"]
        com_regon = request.form["reg"]
        com_nip = request.form["nip"]
        com_post = request.form["pst"]
        com_street = request.form["strt"]
        com_city = request.form["city"]
        com_strnum = request.form["strtnum"]
        com_type = request.form["cp_type"]

        #przechwycone dane o firmie

        if filled_form_correctly:
            #przeslij do bazy i guess
            return redirect(url_for("views.user"))
        else:
            return render_template('companyinfo.html')
        
    else:
        return render_template('companyinfo.html')
