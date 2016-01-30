import os
import app_settings # this is our config.
from flask import Flask
from flask.ext.login import LoginManager
from flask_wtf import CsrfProtect

csrf = CsrfProtect()

app = Flask(__name__)
csrf.init_app(app)

#----------------------------------------
# Config
#----------------------------------------
#  To run in production mode you set the ADMIN_TOOL_ENV == 'production'
#
application_env = os.getenv('ADMIN_TOOL_ENV')
if ( application_env and application_env == "production"):
    app.config.from_object(app_settings.ProductionConfig)
elif ( application_env and application_env == "testing"):
    app.config.from_object(app_settings.TestingConfig)
else:
    app.config.from_object(app_settings.DevelopmentConfig)

app.logger.warning("running in this environment: " + format(app.config['ENV_STRING']))
app.secret_key = app.config['SECRET_KEY']

#----------------------------------------
# Setup Various Globals Needed for the App
#----------------------------------------
# Setup MongoAlchemy ODM
# from flask.ext.mongoalchemy import MongoAlchemy
# mongoDb = MongoAlchemy(app)

# Setup SQLAlchemy ORM
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
db = SQLAlchemy(app)


#Auth Stuff
theLoginMgr = LoginManager()
theLoginMgr.init_app(app)
theLoginMgr.login_view = 'login'

#----------------------------------------
# Other Imports
#----------------------------------------
# Import all the WS models
# import models.UnknownSenders
# import models.KnownSenders
# create the needed circular include.
import songshift.router

db.create_all()
