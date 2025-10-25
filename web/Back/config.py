import os

mail_username = str(os.getenv('MAIL_USERNAME'))
mail_password = str(os.getenv('MAIL_PASSWORD'))
mail_recipient = str(os.getenv('MAIL_RECIPIENT'))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or os.getenv('SECRET_KEY')

