#Biraj Chowdhury, Connor Oh, Manfred Tan, Alex Olteanu
#Peter Pickled Peppers

from flask import Flask, request, redirect, session, render_template, url_for, flash
import os

 Flask,render_template
app = Flask(__name__)

app = Flask(__name__)

app.secret_key = os.urandom(32)

@app.route("/")
def hello_world():
    return render_template("base.html")

@app.route("/another")
def another():
    return

if __name__ == "__main__":
    app.debug = True
    app.run()
