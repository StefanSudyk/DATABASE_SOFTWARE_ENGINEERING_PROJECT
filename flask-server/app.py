from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

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

db = SQLAlchemy()

def create_app():

    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:password@localhost/housedb"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

    db.init_app(app)

    from routes import register_routes
    register_routes(app, db)

    migrate = Migrate(app, db)
    #app.app_context().push()
    return app
    
'''
WAŻNE!!!
Żeby coś robić musicie mieć u siebie folder migrations
Żeby go zrobić piszecie w terminalu cmd/ps w katalogu flask server:
    flask db init
Cały folder jest w gitignore i niech tak zostanie

'''    

'''
Żeby wymigrować zmiany w modelach do bazy to robicie tak
jestescie w terminalu cmd/ps w katalogu flask-server
piszecie: 
    flask db migrate
Powinno napisac ze sa jakies zmiany w tabelach chyba
jak git to dajecie:
    flask db upgrade
'''
