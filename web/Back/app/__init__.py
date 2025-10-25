from flask import Flask
from config import Config, mail_username, mail_password
from flask_mail import Mail
from flask_talisman import Talisman

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__, 
            template_folder='../../Front/', 
            static_folder='../../Front/assets',)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = mail_username
app.config['MAIL_PASSWORD'] = mail_password
mail = Mail(app)

app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

Talisman(app)  
#Talisman(app, force_https=False)    

limiter = Limiter(
    get_remote_address,  
    app=app
)

app.config.from_object(Config)
from app import routes