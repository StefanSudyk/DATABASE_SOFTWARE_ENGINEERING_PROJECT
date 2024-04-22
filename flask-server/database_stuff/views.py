from flask import Blueprint, render_template, url_for, redirect
from auth import session

views = Blueprint('views', __name__, static_folder="static", template_folder="templates")

@views.route('/')
def index():
    return render_template('index.html')


@views.route('/user')
def user():
    if "usr_phnum" in session:
        phnum = session["usr_phnum"]
        return render_template('user.html', phone_number=phnum)
    else:
        return redirect(url_for("auth.login"))