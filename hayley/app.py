from flask import Flask, request, jsonify
from flask.templating import render_template
from database import Database

app = Flask(__name__)
app.config.from_pyfile('server.cfg')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

db = Database(app)

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
        db.create("1234",location_review, location_rating)


    return render_template("mapPage.html", mapbox_access_token=mapbox_access_token)





    
@app.route('/',methods=['GET', 'POST'])
def show_all_reviews():
  if request.method == 'POST':
    movie_name = request.form.get("movie_name")
    movie_review = request.form.get("movie_review")
    movie_rating = request.form.get("movie_rating")
    
    db.create(location_review, movie_rating)
  reviewItems = db.get()
  return render_template("home.html", reviewItems = reviewItems)