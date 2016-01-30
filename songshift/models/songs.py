from songshift import db

class Song(db.Model):

    __tablename__ = "songs"
    id = db.Column(db.Integer, primary_key=True)
    affinity = db.Column(db.Boolean)
    genre = db.Column(db.String(150))
    tags = db.Column(db.String(250))
    def __repr__(self):
        return '<User %r>' % self.genre