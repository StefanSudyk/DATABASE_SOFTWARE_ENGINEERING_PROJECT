create database otodom;
use otodom;
CREATE TABLE Uzytkownik (
    ID_uzytkownika INTEGER auto_increment PRIMARY KEY NOT NULL ,
    Imie varchar(20)  NOT NULL ,
    Nazwisko varchar(20)  NOT NULL ,
    Nr_tel varchar(9)  NOT NULL ,
    Haslo varchar(20)  NOT NULL 
);

CREATE TABLE Nieruchomosc (
    ID_nieruchomosci INTEGER auto_increment PRIMARY KEY NOT NULL ,
    ID_wlasciciela INTEGER  NOT NULL ,
    Tytul varchar(100)  NOT NULL ,
    Cena DECIMAL(11,2) NOT NULL ,
    Metraz float  NOT NULL ,
    Otoczenie ENUM('Las', 'Miasto', 'Wieś', 'Dolina', 'Góry','Morze','Rzeka','Strumyk') NOT NULL ,
    Standard_wykonczenia ENUM ('Dom', 'Szeregówka', 'Mieszkanie') NOT NULL ,
    Stan ENUM('Formalności przed','Stan zerowy','Stan surowy otwarty','Stan surowy zamknięty','Prace wykończeniowe','Gotowy')  NOT NULL ,
    Rynek ENUM ('Wtórny','Pierwotny')  NOT NULL ,
    CONSTRAINT fk_wlasciciel FOREIGN KEY (ID_wlasciciela) REFERENCES Uzytkownik(ID_uzytkownika)
);

CREATE TABLE Adres (
    ID_nieruchomosci INTEGER  PRIMARY KEY NOT NULL ,
    Wojewodztwo varchar(30)  NOT NULL ,
    Powiat varchar(100)  NOT NULL ,
    Gmina varchar(100)  NOT NULL ,
    Miejscowosc varchar(100)  NOT NULL ,
    Ulica varchar(100)  NOT NULL ,
    Kod_pocztowy varchar(20)  NOT NULL ,
    Wspolrzedne POINT NOT NULL,
    CONSTRAINT fk_adres_nieruchomosc FOREIGN KEY (ID_nieruchomosci) REFERENCES Nieruchomosc(ID_nieruchomosci)
);

CREATE TABLE Wnetrze (
    ID_nieruchomosci INTEGER PRIMARY KEY NOT NULL ,
    Ilosc_pokoi INTEGER  NOT NULL ,
    Ilosc_lazienek INTEGER NOT NULL ,
    Ilosc_garaz INTEGER  NOT NULL ,
    Ilosc_balkon INTEGER NOT NULL,
    Ilosc_pieter INTEGER  NOT NULL ,
    Rodzaj_ogrzewania ENUM('Brak','Pompa ciepła','Piec','Piec na eko groszek','Piec gazowy','Ogrzewanie elektryczne','Kolektory słoneczne') NOT NULL ,
    Opis varchar(500) ,
    CONSTRAINT fk_wnetrze_nieruchomosci FOREIGN KEY (ID_nieruchomosci) REFERENCES Nieruchomosc(ID_nieruchomosci)
);
