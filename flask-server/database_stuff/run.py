from app import create_app
from flask_restful import Api
from userApi import *



flask_app = create_app()
api = Api(flask_app)

"""
Api musi być definiowane tutaj z serwerem bo inaczej się robi gówno i nie widzi requestów w ogóle 
"""


# TODO - zrobić edycje i api dla reszty tabel



if __name__ == '__main__':
    api.add_resource(GetUser, "/get/<int:user_id>")
    api.add_resource(PostUser, '/post')
    api.add_resource(DeleteUser, '/delete/<int:user_id>')
    api.add_resource(GetAllUsers, '/get')
    api.add_resource(EditUserInformation, '/patch/<int:user_id>/<string:action>')
    flask_app.run(debug=True)
