from flask import Blueprint, render_template, url_for, redirect
from auth1 import session

views = Blueprint('views', __name__, static_folder="static", template_folder="templates")

@views.route('/')
def index():
    return render_template('index.html')


@views.route('/user')
def user():
    if "phonenumber" in session:
        phonenumber = session["phonenumber"]
        return render_template('user.html', phone_number=phonenumber)
    else:
        return redirect(url_for("auth.login"))

@views.route('/signup')
def signup():
    return render_template('signup.html')