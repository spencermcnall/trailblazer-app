from flask import Flask, request, jsonify
from flask.templating import render_template
from database import Database
import db

app = Flask(__name__)
app.config.from_pyfile('server.cfg')

db = Database(app)
db.db.create_all()
if (len(db.get()) == 0):
    db.create("This park is very family friendly, I see lots of dog walkers and children.", "⭐⭐⭐⭐")

@app.route("/")
def homepage():
    return render_template("test.html")


# Shows location with reviews, some id should be used as input
@app.route("/map", methods=['GET', 'POST'])
def map_page():
    mapbox_access_token = 'pk.eyJ1Ijoic21jbmFsbDEiLCJhIjoiY2t3bW1wcHh1MmRocDJ0bm9pamdvaHA2eCJ9.Z5gTQQvyzRvEd-xhExmtiA'
    if request.method == 'POST':
        location_rating = request.form.get("location_rating")
        location_review = request.form.get("location_review")
        db.create(location_review, location_rating)
    
    reviewItems = db.get()

    return render_template("mapPage.html", mapbox_access_token=mapbox_access_token, reviewItems = reviewItems)


if __name__ == '__main__':
    app.run(debug=True)


    # Original app.py

from flask import Flask, request, jsonify
from flask.templating import render_template

app = Flask(__name__)
app.config.from_pyfile('server.cfg')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

@app.route("/")
def homepage():
    return render_template("test.html")

@app.route("/map", methods=['GET', 'POST'])
def map_page():

    mapbox_access_token = 'pk.eyJ1Ijoic21jbmFsbDEiLCJhIjoiY2t3bW1wcHh1MmRocDJ0bm9pamdvaHA2eCJ9.Z5gTQQvyzRvEd-xhExmtiA'
    
    return render_template("mapPage.html", mapbox_access_token=mapbox_access_token)
