#Biraj Chowdhury, Connor Oh, Manfred Tan, Alex Olteanu
#Peter Pickled Peppers

from flask import Flask, request, redirect, session, render_template, url_for, flash
from urllib.request import urlopen
from util.procureData import getData
import os,json

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
    moberg = getData("app/util/tempReconstructions/mobergReconstruction.txt")
    christiansen =getData("app/util/tempReconstructions/christiansenReconstruction.txt")
    shi = getData("app/util/tempReconstructions/shiReconstruction.txt")
    print(moberg[0])
    return render_template("historyTells.html",mobergdata=moberg,christiansendata=christiansen,shidata=shi)

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
    print(request.form)
    if('zip' in request.form):
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
    return render_template("help.html")

@app.route("/usmap", methods=["GET","POST"])
def usMap():
    date = "01/01/2014"
    if ('date' in request.form and request.form['date'] != ""):
        date =  request.form['date']
    date = date.split("/")
    print(date)
    return render_template("usmap.html", infdate=date)
if __name__ == "__main__":
    app.debug = True
    app.run()
