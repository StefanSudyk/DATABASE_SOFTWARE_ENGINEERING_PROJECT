from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

"""
Ustawienia w mysql workbench zróbcie tak by były podobne do moich. 
Po odpaleniu connectora zróbcie poniższe w terminalu:

cd flask-server
 python
    >>>from app import app
    >>>from app import db
    >>>db.create_all()
    
To odpali i stworzy wam przez pythona pierwszą tabele, która znajduje sie poniżej.
"""
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:password@localhost/housedb"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

app.app_context().push()

class User(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.String(80))
    surname = db.Column(db.String(80))
    phone_number = db.Column(db.String(9))

    def __init__(self, name, surname, phone_number):
        self.name = name
        self.surname = surname
        self.phone_number = phone_number


