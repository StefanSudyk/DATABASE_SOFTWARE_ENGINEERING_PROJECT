from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import timedelta
from flask_cors import CORS
from flask_login import LoginManager

db = SQLAlchemy()

def create_app():

    app = Flask(__name__, template_folder='templates')
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:password@localhost/housedb"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    #app.config['WTF_CSRF_ENABLED'] = False
    app.secret_key = "testkey"
    app.permanent_session_lifetime = timedelta(minutes=1)  # session data will be stored for given amount of time
    
    CORS(app) #do fetchowania na front
    
    db.init_app(app)
    

    from views.views_container import views
    from auth1 import auth
    from views.addProp import addProp
    
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(addProp, url_prefix='/')
    
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)
    
    from models import User
    
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    migrate = Migrate(app, db)
    app.app_context().push()
    return app
