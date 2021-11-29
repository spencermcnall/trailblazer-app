from flask import Flask, request, jsonify
from flask.templating import render_template

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/map", methods=['GET', 'POST'])
def map_page():

    mapbox_access_token = 'pk.eyJ1IjoiaGF5bGV5aGFkZ2VzIiwiYSI6ImNrdzB5M2docTd2eXkzMXMxcHAxcXV1NmMifQ.RpqjqIW44lhJYhcCr8fvIg'
    
    return render_template("mapboxTest.html", mapbox_access_token=mapbox_access_token)