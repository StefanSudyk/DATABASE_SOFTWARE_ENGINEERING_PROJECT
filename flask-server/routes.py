from flask import render_template, request
from models import Uzytkownik, Nieruchomosc, Adres, Wnetrze

def register_routes(app, db):

    @app.route('/')
    def index():
        #Nie wiem na razie czy to jest potrzebne ale działa tak a czy bez tego zadziała nie wiem EDIT chyba niepotrzebne
        Uzytkownik.query.all()
        Nieruchomosc.query.all()
        Adres.query.all()
        Wnetrze.query.all()