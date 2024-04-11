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
