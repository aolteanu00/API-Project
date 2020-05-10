#Biraj Chowdhury, Connor Oh, Manfred Tan, Alex Olteanu
#Peter Pickled Peppers

from flask import Flask, request, redirect, session, render_template, url_for, flash
import os

app = Flask(__name__)

app.secret_key = os.urandom(32)

@app.route("/")
def hello_world():
    return render_template("homepage.html")

@app.route("/extremesData")
def extremes():
    return render_template("tempExtremes.html")

@app.route("/globalTemp")
def globalTempAnomaly():
    return render_template("globalTemp.html")

@app.route("/historialTemp")
def moreHistory():
    return render_template("historyTells.html")
@app.route("/usmap", methods=["GET","POST"])
def usMap():
    date = "01/01/2014"
    if ('date' in request.form):
        date =  request.form['date']
        date = date.split("/")
        date = date[2] + "-" + date[0] + "-" + date[1]
    print(date)
    return render_template("usmap.html", date=date)
if __name__ == "__main__":
    app.debug = True
    app.run()
