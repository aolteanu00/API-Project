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


if __name__ == "__main__":
    app.debug = True
    app.run()
