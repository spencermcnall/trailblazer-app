# Authors: Hayley Hadges, Roman Bactol, Spencer McNall

# Import statements
from flask import Flask, request, redirect, url_for
from flask.templating import render_template
from database import Database
import db

app = Flask(__name__)
app.config.from_pyfile('server.cfg')

# Creates database table, adding 2 example reviews
db = Database(app)
db.db.create_all()
if (len(db.get()) == 0):
    db.create("Pipestone National Monument", "This park is very family friendly, I see lots of dog walkers and children.", "⭐⭐⭐⭐")
    db.create("Mississippi National River & Recreation Area", "This park has lots of great trails for hiking! Also the views are great.", "⭐⭐⭐⭐⭐")

@app.route("/")
def homepage():
    return render_template("cover.html")


# Shows reviews of location, allowing for new reviews to be added to the database
@app.route("/map", methods=['GET', 'POST'])
def map_page():
    mapbox_access_token = 'pk.eyJ1Ijoic21jbmFsbDEiLCJhIjoiY2t3bW1wcHh1MmRocDJ0bm9pamdvaHA2eCJ9.Z5gTQQvyzRvEd-xhExmtiA'
    if request.method == 'POST':
        location_name = request.form.get("form_loc_name")
        location_rating = request.form.get("rating")
        location_review = request.form.get("location_review")
        db.create(location_name, location_review, location_rating)
        return redirect(url_for('map_page'))
    
    reviewItems = db.get()

    return render_template("mapPage.html", mapbox_access_token=mapbox_access_token, reviewItems = reviewItems)
