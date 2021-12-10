# Run in the terminal to reset the database

print('Resetting database...')
from app import db
# Reset the database
db.db.drop_all()
# Create the tables
db.db.create_all()
print('Database reset: success!')

