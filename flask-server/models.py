from app import db
from flask_login import UserMixin
from sqlalchemy.sql import func

# TODO: określić architekture bd

class Uzytkownik(db.Model):
    id_uzytkownika = db.Column(db.Integer, unique=True, primary_key=True)
    imie = db.Column(db.String(20))
    nazwisko = db.Column(db.String(20))
    numer_telefonu = db.Column(db.String(9))
    haslo = db.Column(db.String(20))
    nieruchomosci = db.relationship('Nieruchomosc', backref='wlasciciel', lazy=True)

    def __init__(self, id_uzytkownika, imie, nazwisko, numer_telefonu, haslo):
        self.id_uzytkownika = id_uzytkownika
        self.imie = imie
        self.nazwisko = nazwisko
        self.numer_telefonu = numer_telefonu
        self.haslo = haslo


class Nieruchomosc(db.Model):
    id_nieruchomosci = db.Column(db.Integer, unique=True, primary_key=True)
    id_wlasciciela = db.Column(db.Integer, db.ForeignKey('uzytkownik.id_uzytkownika')) 
    tytul = db.Column(db.String(100))
    #IDK czy tak z ta cena ale dalem ze do 2 dokladnosc miejsc
    cena = db.Column(db.Float(precision = 2))
    metraz = db.Column(db.Float)
    otoczenie = db.Column(db.String(20))
    standard_wykonczenia = db.Column(db.String(20))
    stan = db.Column(db.String(30))
    rynek = db.Column(db.String(20))
    adres = db.relationship('Adres', uselist=False, backref='nieruchomosc', lazy=True) #uselist=false do relacji jeden do jednego
    wnetrze = db.relationship('Wnetrze', uselist=False, backref='nieruchomosc', lazy=True)

    def __init__(self, id_nieruchomosci, id_wlasciciela, tytul, cena, metraz, otoczenie, standard_wykonczenia, stan, rynek):
        self.id_nieruchomosci = id_nieruchomosci
        self.id_wlasciciela = id_wlasciciela
        self.tytul = tytul
        self.cena = cena
        self.metraz = metraz
        self.otoczenie = otoczenie
        self.standard_wykonczenia = standard_wykonczenia
        self.stan = stan
        self.rynek = rynek


class Adres(db.Model):
    id_nieruchomosci = db.Column(db.Integer, db.ForeignKey('nieruchomosc.id_nieruchomosci'), primary_key=True)
    wojewodztwo = db.Column(db.String(30))
    powiat = db.Column(db.String(100))
    gmina = db.Column(db.String(100))
    miejscowosc = db.Column(db.String(100))
    ulica = db.Column(db.String(100))
    kod_pocztowy = db.Column(db.String(20))
    wspolrzedne = db.Column(db.Integer)
    
    def __init__(self, id_nieruchomosci, wojewodztwo, powiat, gmina, miejscowosc, ulica, kod_pocztowy, wspolrzedne):
        self.id_nieruchomosci = id_nieruchomosci
        self.wojewodztwo = wojewodztwo
        self.powiat = powiat
        self.gmina = gmina
        self.miejscowosc = miejscowosc
        self.ulica = ulica
        self.kod_pocztowy = kod_pocztowy
        self.wspolrzedne = wspolrzedne

class Wnetrze(db.Model):
    id_nieruchomosci = db.Column(db.Integer, db.ForeignKey('nieruchomosc.id_nieruchomosci'), primary_key=True)
    ilosc_pokoi = db.Column(db.Integer)
    ilosc_lazienek = db.Column(db.Integer)
    ilosc_garaz = db.Column(db.Integer)
    ilosc_balkon = db.Column(db.Integer)
    ilosc_pieter = db.Column(db.Integer)
    rodzaj_ogrzewania = db.Column(db.String(30))
    opis = db.Column(db.String(500))

    def __init__(self, id_nieruchomosci, ilosc_pokoi, ilosc_lazienek, ilosc_garaz, ilosc_balkon, ilosc_pieter, rodzaj_ogrzewania, opis):
        self.id_nieruchomosci = id_nieruchomosci
        self.ilosc_pokoi = ilosc_pokoi
        self.ilosc_lazienek = ilosc_lazienek
        self.ilosc_garaz = ilosc_garaz
        self.ilosc_balkon = ilosc_balkon
        self.ilosc_pieter = ilosc_pieter
        self.rodzaj_ogrzewania = rodzaj_ogrzewania
        self.opis = opis