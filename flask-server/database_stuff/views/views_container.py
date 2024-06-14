from flask import Blueprint, render_template, url_for, redirect
from auth1 import session
from flask_login import current_user
import requests

views = Blueprint('views', __name__, static_folder="static", template_folder="templates")

@views.route('/')
def index():
    return render_template('index.html')


@views.route('/user')
def user():
    response = requests.get("http://127.0.0.1:5000/currentuser")
    print("sprobuj no")
    print(response)
    print(type(response))
        
    if current_user.is_authenticated:
        phonenumber = current_user.phone_number
        return render_template('user.html', phone_number=phonenumber)
    else:
        return redirect(url_for("auth.login"))

@views.route('/signup')
def signup():
    return render_template('signup.html')