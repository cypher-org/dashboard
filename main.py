import json
import requests
import os
from flask import Flask, redirect, url_for,render_template , jsonify,redirect,make_response
from flask_discord import DiscordOAuth2Session, requires_authorization, Unauthorized

os.environ['OAUTHLIB_INSECURE_TRANSPORT']  ='1'
app = Flask(__name__)
app.secret_key = os.urandom(12)

app.config["DISCORD_CLIENT_ID"] = 1061216209355419708    
app.config["DISCORD_CLIENT_SECRET"] = "L8UOkUUX5mjoeqFtztoZFtJXXiSGztLU"              
app.config["DISCORD_REDIRECT_URI"] = "http:///callback/"   
app.config["DISCORD_BOT_TOKEN"] = "MTA2MTIxNjIwOTM1NTQxOTcwOA.GAWx3i.WKsz2lXpOseQppsYBxLFVgAHVfDipEoTLEIlhE"
discord = DiscordOAuth2Session(app)

auth = {}

@app.route("/login/")
def login():
    return discord.create_session(scope=["guilds","guilds.members.read","identify","messages.read"])

@app.errorhandler(Unauthorized)
def redirect_unauthorized(e):
    return redirect(url_for("login"))


@app.route("/callback/")
def callback():
    discord.callback()
    return redirect(url_for("index"))


@app.route('/getuser/<token>')
def user_get(token):
    i = 0
    head = {"authorization": f"Bearer {token}"}
    info = {
        "userinfo":dict(requests.get("https://discord.com/api/v9/users/@me", headers=head).json()),
        "guilds":list(filter(lambda y: "4398046511103" in y['permissions'] ,list(requests.get("https://discord.com/api/v9/users/@me/guilds", headers=head).json())))
    }
    return info


@app.route('/getguild/<id>')
def guild_get(id):
    head = {"authorization": f"Bot MTA2MTIxNjIwOTM1NTQxOTcwOA.GAWx3i.WKsz2lXpOseQppsYBxLFVgAHVfDipEoTLEIlhE"}
    info = {
        "guildinfo":dict(requests.get(f"https://discord.com/api/v9/guilds/{id}", headers=head).json()),
        "members":list(requests.get(f"https://discord.com/api/v9/guilds/{id}/members", headers=head).json())
    }
    return info


@app.route('/')
@requires_authorization
def index():
    auth = discord.get_authorization_token()['access_token']
    return render_template("/index.html",auth=auth)



if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0")