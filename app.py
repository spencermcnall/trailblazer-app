from flask import Flask, request, jsonify
from flask.templating import render_template

app = Flask(__name__)
app.config.from_pyfile('server.cfg')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/map", methods=['GET', 'POST'])
def map_page():

    mapbox_access_token = 'pk.eyJ1Ijoic21jbmFsbDEiLCJhIjoiY2t3bW1wcHh1MmRocDJ0bm9pamdvaHA2eCJ9.Z5gTQQvyzRvEd-xhExmtiA'
    
    return render_template("mapboxTest.html", mapbox_access_token=mapbox_access_token)