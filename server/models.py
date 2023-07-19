from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Card(db.Model, SerializerMixin):
    __tablename__ = 'cards'

    # Fields
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    card_type = db.Column(db.String, nullable=False)
    
    set_id = db.Column(db.Integer, db.ForeignKey('sets.id'))

    # Relationships
    artworks = db.relationship("Artwork", back_populates="card", cascade='all, delete-orphan')
    set = db.relationship("Set", back_populates="cards")

    artists = association_proxy('artworks', 'artist', creator=lambda a: Artwork(artist=a))

    # Serializer
    serialize_rules = ('-artworks', '-set')

    # Validations
    @validates('name')
    def validate_name(self, key, value):
        if not (value[0].isupper()):
            raise ValueError("Card name must start with a capital letter.")
        return value
    
    @validates('card_type')
    def validate_card_type(self, key, value):
        card_types = ['Pokemon', 'Trainer', 'Item', 'Supporter']
        if not value in card_types:
            raise ValueError(f'{value} must be either Pokemon, Trainer, Item, or Supporter.')
        return value

class Artist(db.Model, SerializerMixin):
    __tablename__ = 'artists'

    # Fields
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)


    # Relationships
    artworks = db.relationship("Artwork", back_populates="artist", cascade='all, delete-orphan')
    cards = association_proxy('artworks', 'card', creator=lambda c: Artwork(card=c))
    # Serializer
    serialize_rules = ('-artworks',)
    
    # Validations
    @validates(first_name)
    def validate_first_name(self, key, value):
        if not (value[0].isupper()):
            raise ValueError("First name must start with a capital.")
        return value
    
    @validates(last_name)
    def validate_last_name(self, key, value):
        if not (value[0].isupper()):
            raise ValueError("Last name must start with a capital.")
        return value
    
    
class Set(db.Model, SerializerMixin):
    __tablename__ = 'sets'

    # Fields
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    release_year= db.Column(db.Integer, nullable=False)

    # Relationships
    cards = db.relationship("Card", back_populates="set", cascade="all, delete-orphan")

    # Serializer
    serialize_rules = ('-cards',)

    # Validations
    @validates('name')
    def validate_name(self, key, value):
        if not (value[0].isupper()):
            raise ValueError("Set name must start with a capital.")
        return value
    
    @validates('release_year')
    def validate_release_year(self, key, value):
        if not (1998 <= int(value) <= 9999):
            raise ValueError("Release year can only be after 1998.")
        return value

class Artwork(db.Model, SerializerMixin):
    __tablename__ = 'artworks'

    #Fields
    
    id = db.Column(db.Integer, primary_key=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'))
    card_id = db.Column(db.Integer, db.ForeignKey('cards.id'))

    # Relationships

    card = db.relationship("Card", back_populates="artworks")
    artist = db.relationship("Artist", back_populates="artworks")

    # Serializer
    serialize_rules = ('-card', '-artist')

    # Validations
    @validates("artist_id", "card_id")
    def validate_data(self, key, value):
        if not value:
            raise ValueError(f"Artwork must have a {key}.")
        return value

class User(db.Model, SerializerMixin):
    ___tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    password_hash = db.Column(db.String)

    def __repr__(self):
        return f'`<User id="{self.id}" username="{self.username}"`>'
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }