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

	def create(self, fsq_id, review_text, rating):
		review = self.model(fsq_id, review_text, rating)
		self.db.session.add(review)
		self.db.session.commit()


	def delete(self, id):
		review = self.get(id)
		self.db.session.delete(review)
		self.db.session.commit()

def reviewFactory(db):
	class Review(db.Model):
		__tablename__ = 'reviews'
		id = db.Column('review_id', db.Integer, primary_key=True)
		fsq_id = db.Column(db.String(60))
		review_text = db.Column(db.String)
		rating = db.Column(db.String)

		def __init__(self, fsq_id, review_text, rating):
			self.fsq_id = fsq_id
			self.review_text = review_text
			self.rating = rating
	return Review


