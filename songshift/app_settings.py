import os


class Config(object):
    basedir = os.path.abspath(os.path.dirname(__file__))

    DEBUG = False
    TESTING = False
    SECRET_KEY = "the_seceret_kjsdifnnn9iekjkjvn23k$$@"
    CSRF_ENABLED = True
    ENV_STRING = "default"
    GOOGLE_ANALYTICS_KEY = ""


    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')


class ProductionConfig(Config):
    DEBUG = False
    ENV_STRING = "development"


class DevelopmentConfig(Config):
    DEBUG = True
    ENV_STRING = "development"

class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    ENV_STRING = "testing"