from flask import Flask, request, redirect, session, render_template, url_for, flash
from urllib.request import urlopen
import json
import os

app = Flask(__name__)

app.secret_key = os.urandom(32)

@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/help", methods=['GET', 'POST'])
def help():

    #req = request.form['zip', False]
    #link = urlopen("https://whoismyrepresentative.com/getall_mems.php?output=json&zip=11357")
    #response = link.read()
    #data = json.loads( response )
    #print(data)
    #results = data['results']
    return render_template("help.html", results=[])

@app.route("/zip", methods=['GET', 'POST'])
def zip():
    zip = request.form['zip']
    print(zip)
    link = "https://whoismyrepresentative.com/getall_mems.php?output=json&zip=" + zip
    try:
        open = urlopen(link)
        response = open.read()
        data = json.loads( response )
        results = data['results']
    except:
        results = [{'name': 'Invalid ZIP code', 'link':''}]
    return render_template("help.html", results=results)


if __name__ == "__main__":
    app.debug = True
    app.run()
