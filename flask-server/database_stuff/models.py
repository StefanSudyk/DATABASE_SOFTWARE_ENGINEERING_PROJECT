from app import db


# TODO: określić architekture bd

class Uzytkownik(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    imie = db.Column(db.String(20))
    nazwisko = db.Column(db.String(20))
    numer_telefonu = db.Column(db.String(9))
    haslo = db.Column(db.String(20))

    def __init__(self, imie, nazwisko, numer_telefonu, haslo):
        self.imie = imie
        self.nazwisko = nazwisko
        self.numer_telefonu = numer_telefonu
        self.haslo = haslo


class Nieruchomosc(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    id_wlasciciela = db.Column(db.Integer)
    tytul = db.Column(db.String(100))
    #IDK czy tak z ta cena ale dalem ze do 2 dokladnosc miejsc
    cena = db.Column(db.Float(precision=2))
    metraz = db.Column(db.Float)
    otoczenie = db.Column(db.String(20))
    standard_wykonczenia = db.Column(db.String(20))
    stan = db.Column(db.String(30))
    rynek = db.Column(db.String(20))

    def __init__(self, id_wlasciciela, tytul, cena, metraz, otoczenie, standard_wykonczenia, stan, rynek):
        self.id_wlasciciela = id_wlasciciela
        self.tytul = tytul
        self.cena = cena
        self.metraz = metraz
        self.otoczenie = otoczenie
        self.standard_wykonczenia = standard_wykonczenia
        self.stan = stan
        self.rynek = rynek


class Adres(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    wojewodztwo = db.Column(db.String(30))
    powiat = db.Column(db.String(100))
    gmina = db.Column(db.String(100))
    miejscowosc = db.Column(db.String(100))
    ulica = db.Column(db.String(100))
    kod_pocztowy = db.Column(db.String(20))
    wspolrzedne = db.Column(db.Integer)

    def __init__(self, id, wojewodztwo, powiat, gmina, miejscowosc, ulica, kod_pocztowy, wspolrzedne):
        self.id = id
        self.wojewodztwo = wojewodztwo
        self.powiat = powiat
        self.gmina = gmina
        self.miejscowosc = miejscowosc
        self.ulica = ulica
        self.kod_pocztowy = kod_pocztowy
        self.wspolrzedne = wspolrzedne


class Wnetrze(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    ilosc_pokoi = db.Column(db.Integer)
    ilosc_lazienek = db.Column(db.Integer)
    ilosc_garaz = db.Column(db.Integer)
    ilosc_balkon = db.Column(db.Integer)
    ilosc_pieter = db.Column(db.Integer)
    rodzaj_ogrzewania = db.Column(db.String(30))
    opis = db.Column(db.String(500))

    def __init__(self, id, ilosc_pokoi, ilosc_lazienek, ilosc_garaz, ilosc_balkon, ilosc_pieter, rodzaj_ogrzewania,
                 opis):
        self.id = id
        self.ilosc_pokoi = ilosc_pokoi
        self.ilosc_lazienek = ilosc_lazienek
        self.ilosc_garaz = ilosc_garaz
        self.ilosc_balkon = ilosc_balkon
        self.ilosc_pieter = ilosc_pieter
        self.rodzaj_ogrzewania = rodzaj_ogrzewania
        self.opis = opis
