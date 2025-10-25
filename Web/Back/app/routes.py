from flask import render_template, redirect, request
from app import app, mail
from flask_mail import Message
from config import mail_username, mail_recipient, mail_password
from smtplib import SMTPException
from app import limiter

@app.route('/')
@limiter.limit("20 per minute", error_message="")
def index():
    return render_template('index.html', title='Armor Eye')


@app.route('/contactwithus', methods=['POST'])
@limiter.limit("1 per 3 seconds", error_message="Please try after few seconds")
def contactwithus():
    if(request.form['text'] == "" or request.form['email'] == "" or request.form['message'] == ""):     
        return "Required fields are empty"
    
    try:              
        msg = Message(
            subject="New contact",
            sender=mail_username, 
            recipients=[mail_recipient]
        )
        html_content = f"""
        <html>
            <body>
                <h1>Message from {request.form['text']}</h1>
                <p><strong>Contact info</strong>: {request.form['email']}</p>
                <p><strong>Message</strong>: {request.form['message']}</p>
            </body>
        </html>
        """        
        msg.html = html_content
        mail.send(msg)
        return redirect('/')
    except AssertionError or SMTPException:
        return "A server error occurred"