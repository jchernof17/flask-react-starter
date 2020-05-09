from api import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    purpose = db.Column(db.String(140), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    role = db.Column(db.Integer, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    token = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return '<User: ' + str(self.id) + '(' + self.name + ')>'
