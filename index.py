import os

from flask import Flask, redirect, url_for,render_template
from flask_discord import DiscordOAuth2Session, requires_authorization, Unauthorized

app = Flask(__name__)

app.secret_key = b"Dashboard"

app.config["DISCORD_CLIENT_ID"] = 1061216209355419708    
app.config["DISCORD_CLIENT_SECRET"] = "L8UOkUUX5mjoeqFtztoZFtJXXiSGztLU"              
app.config["DISCORD_REDIRECT_URI"] = "https://127.0.0.1:5000/callback/"                 # URL to your callback endpoint.
app.config["DISCORD_BOT_TOKEN"] = "MTA2MTIxNjIwOTM1NTQxOTcwOA.GAWx3i.WKsz2lXpOseQppsYBxLFVgAHVfDipEoTLEIlhE"

discord = DiscordOAuth2Session(app)

@app.route("/login/")
def login():
    return discord.create_session()

@app.errorhandler(Unauthorized)
def redirect_unauthorized(e):
    return redirect(url_for("login"))


@app.route("/callback/")
def callback():
    discord.callback()
    return redirect(url_for("index"))


@app.route('/')
@requires_authorization
def index():
    return render_template("/index.html")

if __name__ == '__main__':
    app.run(debug=True)