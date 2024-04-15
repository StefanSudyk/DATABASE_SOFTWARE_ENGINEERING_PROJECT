from flask import Blueprint, render_template
auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return "<p>login</p>"

@auth.route('/logout')
def logout():
    return "<p>logout</p>"

@auth.route('/signup')
def signup():
    return "<p>signup</p>"
