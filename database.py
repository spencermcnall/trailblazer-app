# Authors: Hayley Hadges, Roman Bactol, Spencer McNall

from flask_sqlalchemy import SQLAlchemy

#Initialize database
class Database:
	def __init__(self, app):
		db = SQLAlchemy(app)
		self.db = db
		self.model = reviewFactory(db)

	def get(self, id=None):
		if id:
			return self.model.query.get(id)
		return self.model.query.all()

	def create(self, park_name, review_text, rating):
		review = self.model(park_name, review_text, rating)
		self.db.session.add(review)
		self.db.session.commit()

#Set up database structure
def reviewFactory(db):
	class Review(db.Model):
		__tablename__ = 'reviews'
		id = db.Column('review_id', db.Integer, primary_key=True)
		park_name = db.Column(db.String)
		review_text = db.Column(db.String)
		rating = db.Column(db.String)

		def __init__(self, park_name, review_text, rating):
			self.park_name = park_name
			self.review_text = review_text
			self.rating = rating
	return Review


