from songshift import db

class Song(db.Model):
    __tablename__ = "songs"
    id = db.Column(db.Integer, primary_key=True)
    songid = db.Column(db.Integer)
    affinity = db.Column(db.Integer)
    genre = db.Column(db.String(150))
    def __repr__(self):
        return '<Song %r %r>' % (self.genre, self.affinity)