from flask_sqlalchemy import SQLAlchemy

class Database:
	def __init__(self, app):
		db = SQLAlchemy(app)
		self.db = db
		self.model = reviewFactory(db)

	def get(self, id=None):
		if id:
			return self.model.query.get(id)
		return self.model.query.all()

# Use this to return reviews that have a certain 
	# def get(self, id=None):
	# 	if id:
	# 		return self.model.query.get(id)
	# 	return self.model.query.all()

	def create(self, review_text, rating):
		review = self.model(review_text, rating)
		self.db.session.add(review)
		self.db.session.commit()

def reviewFactory(db):
	class Review(db.Model):
		__tablename__ = 'reviews'
		id = db.Column('review_id', db.Integer, primary_key=True)
		review_text = db.Column(db.String)
		rating = db.Column(db.String)

		def __init__(self, review_text, rating):
			self.review_text = review_text
			self.rating = rating
	return Review


