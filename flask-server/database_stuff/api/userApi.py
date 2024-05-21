from flask import jsonify, Response, request
from flask_restful import Resource, reqparse, fields, marshal_with, abort
from models import *
from service.userService import UserService
from userFilters import filter_by_usertype, filter_by_surname, filter_by_name, sort_users_by_surname, sort_users_by_name
from validators.userValidator import Validation

resource_postuser_fields = {
    'name': fields.String,
    'surname': fields.String,
    'phone_number': fields.String,
    'password': fields.String,
    'email': fields.String,
    'usertype': fields.String
}






class GetUser(Resource):
    def get(self, user_id):
        user_service = UserService()
        try:
            user = User.query.get_or_404(user_id)
            user_service.get_user(user)
        except Exception as e:
            return Response('Error: user not find. '+str(e), status=501, mimetype='application/json')


class GetAllUsers(Resource):
    def get(self):
        user_service = UserService()

        usertype_filter = request.args.get('usertype')
        surname_filter = request.args.get('surname')
        name_filter = request.args.get('name')
        sort_by = request.args.get('sort')
        try:

            #filtrowanie typu uzytkownika czyli admin zwykly

            if usertype_filter:
                
                users = filter_by_usertype(usertype_filter)

            #filtrowanie po nazwisku wyswietla tylko takich userow ktorzy maja okreslone nazwisko

            elif surname_filter:
                print("Filtrowanie po nazwisku")
                users = filter_by_surname(surname_filter)
            
            #Sortowanie albo po imieniu albo po nazwisku alfabetycznie

            elif sort_by == 'surname':
                print("Po imieniu")
                users = sort_users_by_surname()

            elif sort_by == 'name':
                print("Po imieniu")
                users = sort_users_by_name()

            #tak jak w nazwisku, wyswietla tylko tych ktorzy maja okreslone imie

            elif name_filter:
                users = filter_by_name(name_filter)

            #jak nie ma ani sortowania ani filtrowania wyswietla wszytkich

            else:
                print("wszytko")
                users = User.query.all()
            if users == []:
                return Response("No user", status=500, mimetype='application/json')
            return user_service.get_all_users(users)
        except Exception as e:
            return Response('Error: no users. ' + str(e), status=501, mimetype='application/json')


class PostUser(Resource):

    '''z tym marshal_with chodzi o to ze robi sie dicitonary gdzie po lewej stronie
    sa nazwy zmiennych a po prawej ich typ i to co przekaze sie do jsona przy wywolaniu np
    response = requests.post(base + 'postcompany', json=data) musi scisle odpowiadac temu co
    w tym dictionary resource_postuser_fields.
    
    marshal_with nie wiem jak działa ale wiem ze jakos łączy to co się przesyła w requeście
    z tym żeby parser to przyjął'''

    @marshal_with(resource_postuser_fields)
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help='First name is essential')
        parser.add_argument('surname', type=str, required=True, help='Last name is essential')
        parser.add_argument('phone_number', type=str, required=True, help='Phone numver is essential')
        parser.add_argument('password', type=str, required=True, help='Password is essential')
        parser.add_argument('password_repeat', type=str, required=True, help='Entering password again is essential')
        parser.add_argument('email', type=str, required=True, help='Email is essential')
        parser.add_argument('usertype', type=str, required=True, help='Select user type')
        # to dodałem
        parser.add_argument('is_active',type=bool, required=False, default=False)
        args = parser.parse_args()
        print(args)
     
        ### WALIDACJA ###
        validator = Validation()
        user_service = UserService()
        
        check = validator.name_surname_validation(args['name'])
        #print(check, "name")
        check = validator.name_surname_validation(args['surname'])
        #print(check, "surname")
        check = validator.phone_number_validation(args['phone_number'])
        #print(check, "number")
        check = validator.password_len_validation(args['password'])
        #print(check, "pass len")
        check = validator.compare_password_validation(args['password'], args['password_repeat'])
        #print(check, "compare")
        check = validator.email_validation(args['email'])
        #print(check, "email val")
        check = validator.is_email_unique(args['email'])
        #print(check, "email uniq")
        check = validator.is_phone_number_unique(args['phone_number'])
        #print(check, "number uniq")
        check = validator.usertype_validation(args['usertype'])
        #print(check, "usertype val")

        if check:
            user_service.add_user(args)
            return Response("user added", status=201, mimetype='application/json')
        else:
            abort(501, message="something went wrong")

            
class EditUserInformation(Resource):
    """
        :parameter action - name/surname/phone_number/password/email/usertype
    """

    def patch(self, user_id, action: str):
        user = User.query.get_or_404(user_id)
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('surname', type=str)
        parser.add_argument('phone_number', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('password_repeat', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('usertype', type=str) #tu było type=enum i wywalało błąd

        args = parser.parse_args()
        validator = Validation()
        user_service = UserService()

        match action:
            case "name":
                if validator.name_surname_validation(args['name']):
                    user.name = args['name']
                    user_service.patch_user()
            case "surname":
                if validator.name_surname_validation(args['surname']):
                    user.surname = args['surname']
                    user_service.patch_user()
            case "phone_number":
                if (validator.phone_number_validation(args['phone_number'])
                        and validator.is_phone_number_unique(args['phone_number'])):
                    user.phone_number = args['phone_number']
                    user_service.patch_user()
            case "password":
                if (validator.password_len_validation(args['password']) and
                validator.compare_password_validation(args['password'], args['password_repeat'])):
                    user.password = args['password']
                    user_service.patch_user()
            case "email":
                if validator.email_validation(args['email']) and validator.is_email_unique(args['email']):
                    user.email = args['email']
                    user_service.patch_user()
            case "usertype":
                if validator.usertype_validation(args['usertype']):
                    user.usertype = args['usertype']
                    user_service.patch_user()
            case _:
                return Response("Invalid action", status=400, mimetype='application/json')

        return Response("User data edited", status=200, mimetype='application/json')


class DeleteUser(Resource):
    def delete(self, user_id):
        user_service = UserService()
        try:
            user = User.query.get_or_404(user_id)
            user_service.delete_user(user)
            return Response("user deleted", status=200, mimetype='application/json')
        except Exception as e:
            return Response('Error: no user to delete. ' + str(e), status=500, mimetype='application/json')
