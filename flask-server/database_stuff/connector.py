import mysql.connector

"""
Ten kod odpowiedzialny jest za stworzenie bazy danych za pomocą pythona

ODPALAMY TEN PLIK TYLKO RAZ!
"""

mydb_connector = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password"
)

my_curosr = mydb_connector.cursor()

my_curosr.execute("CREATE DATABASE housedb")

my_curosr.execute("SHOW DATABASES")

for db in my_curosr:
    print(db)

