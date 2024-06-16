from run import flask_app
from app import db
from models import Photo
from sqlalchemy import text
from randomEntryGenerator import *

db.drop_all()
db.create_all()

with db.engine.connect() as connection:
    connection.execute(text('ALTER TABLE photo MODIFY COLUMN photo MEDIUMBLOB'))
add_random_users(50)
add_random_properties(1000)
#to trzeba zmienic typ na mediumblob bo dawało tylko 64kb pliki a tak to mozna 16MB
'''
Resetuje bazę danych i modyfikuje typ zdjecia na mediumblob
'''