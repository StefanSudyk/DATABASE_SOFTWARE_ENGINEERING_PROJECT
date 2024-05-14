from models import User

#funkcje do filtrowania i sortowania

#Dla usertype

def filter_by_usertype(usertype):
    users = User.query.filter_by(usertype=usertype).all()
    return users

#Dla imienia

def filter_by_surname(surname):
    users = User.query.filter_by(surname=surname).all()
    return users

def sort_users_by_name():
    users = User.query.order_by(User.name).all()  
    return users

#Dla nazwiska

def filter_by_name(name):
    users = User.query.filter_by(name=name).all()
    return users

def sort_users_by_surname():
    users = User.query.order_by(User.surname).all()  
    return users
