print('Resetting database...')
import db
# Reset the database
db.db.drop_all()
# Create the tables
db.db.create_all()
# Create a test entry which works somewhat
if (len(db.get()) == 0):
    db.create("This park is very family friendly, I see lots of dog walkers and children.", "⭐⭐⭐⭐")
print('Database reset: success!')

