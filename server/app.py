#!/usr/bin/env python3

import ipdb

from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from flask_cors import CORS


from models import db, Card, Artist, Set, Artwork, User

app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cards.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

bcrypt = Bcrypt(app)

CORS(app)

api = Api(app)

def get_current_user():
    return User.query.where(User.id == session.get("user_id")).first()

def  logged_in():
    return bool(get_current_user())

# USER SIGNUP #

@app.post('/users')
def create_user():
    json = request.json
    pw_hash = bcrypt.generate_password_hash(json['password']).decode('utf-8')
    new_user= User(username=json['username'], password_hash=pw_hash)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id
    return new_user.to_dict(), 201

# SESSION LOGIN/LOGOUT #

@app.post('/login')
def login():
    json = request.json
    user = User.query.filter(User.username == json["username"]).first()
    if user and bcrypt.check_password_hash(user.password_hash, json["password"]):
        session['user_id'] = user.id
        return user.to_dict(), 201
    
    else: 
        return {'error': "Invalid username or password"}, 401

@app.get('/current_session')
def check_session():
    if logged_in():
        return get_current_user().to_dict(), 200
    else:
        return {}, 401

@app.delete("/logout")
def logout():
    session["user_id"] = None
    return {"message": "Successfully logged out"}, 204

class Cards(Resource):
    
    def get(self):
        cards = Card.query.all()
        response_body = []
        for card in cards:
            response_body.append(card.to_dict())
        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            data = request.get_json()
            new_card = Card(
                name = data.get('name'),
                image = data.get('image'),
                card_type = data.get('card_type'),
                set_id = data.get('set_id')
            )
            db.session.add(new_card)
            db.session.commit()
            response_body = new_card.to_dict()
            return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

api.add_resource(Cards, '/cards')

class CardsById(Resource):

    def get(self, id):
        card = Card.query.filter(Card.id == id).first()
        if not card:
            response_body = {'error': 'Card not found.'}
            return make_response(jsonify(response_body), 404)
        response_body = card.to_dict()
       
        artist_list = []
        for artist in card.artists:
            artist_dict = artist.to_dict()
            artist_list.append(artist_dict)
        
        set_list = [card.set.to_dict()]
        response_body.update({
            "artists": artist_list,
            "sets": set_list
            })
        return make_response(jsonify(response_body), 200)

    def patch(self, id):
        card = Card.query.filter(Card.id == id).first()
        if not card:
            response_body = {'error': 'Card not found.'}
            return make_response(jsonify(response_body), 404)
        try:
            data = request.get_json()
            for key in data:
                setattr(card, key, data.get(key))
            db.session.commit()
            return make_response(jsonify(card.to_dict()), 202)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

    def delete(self, id):
        card = Card.query.filter(Card.id == id).first()
        if not card:
            response_body = {'error': 'Card not found.'}
            return make_response(jsonify(response_body), 404)
        db.session.delete(card)
        db.session.commit()
        response_body = {}
        return make_response(jsonify(response_body), 204)

api.add_resource(CardsById, '/cards/<int:id>')

class Sets(Resource):

    def get(self):
        sets = Set.query.all()
        response_body = []
        for set in sets:
            response_body.append(set.to_dict())
        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            data = request.get_json()
            new_set = Set(
                name = data.get('name'),
                release_year = data.get('release_year')
            )
            db.session.add(new_set)
            db.session.commit()
            response_body = new_set.to_dict()
            return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

api.add_resource(Sets, '/sets')

class SetsById(Resource):

    def get(self, id):
        set = Set.query.filter(Set.id == id).first()
        if not set:
            response_body = {'error': 'Set not found.'}
            return make_response(jsonify(response_body), 404)
        response_body = set.to_dict()
        
        cards_list = []
        for card in set.cards:
            card_dict = card.to_dict()
            cards_list.append(card_dict)
        
        response_body.update({'cards': cards_list})
        return make_response(jsonify(response_body), 200)

api.add_resource(SetsById, '/sets/<int:id>')

class Artists(Resource):

    def get(self):
        artists = Artist.query.all()
        response_body = []
        for artist in artists:
            response_body.append(artist.to_dict())
        return make_response(jsonify(response_body), 200)

    def post(self):
        
        try:
            data = request.get_json()
            new_artist = Artist(
                first_name = data.get('first_name'),
                last_name = data.get('last_name')
            )
            db.session.add(new_artist)
            db.session.commit()
            response_body = new_artist.to_dict()
            return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

api.add_resource(Artists, '/artists')

class ArtistsById(Resource):

    def get(self, id):
        artist = Artist.query.filter(Artist.id == id).first()
        if not artist:
            response_body = {'error': 'Artist not found.'}
            return make_response(jsonify(response_body), 404)
        response_body = artist.to_dict()
        
        cards_list = []
        for card in artist.cards:
            card_dict = card.to_dict()
            cards_list.append(card_dict)
        
        response_body.update({"cards": cards_list})
        return make_response(jsonify(response_body), 200)

api.add_resource(ArtistsById, '/artists/<int:id>')

class Artworks(Resource):

    def get(self):
        artworks = Artwork.query.all()
        response_body = []
        for artwork in artworks:
            relationship = {
                'card': artwork.card.to_dict(),
                'artist': artwork.artist.to_dict()
            }
            response_body.append(relationship)
        return make_response(jsonify(response_body), 200)

    def post(self):
        try:
            data = request.get_json()
            new_artwork = Artwork(
                card_id = data.get('card_id'),
                artist_id = data.get('artist_id')
            )
            db.session.add(new_artwork)
            db.session.commit()
            response_body = new_artwork.to_dict()
            return make_response(jsonify(response_body), 200)
        except ValueError:
            response_body = {'errors': ['validation errors']}
            return make_response(jsonify(response_body), 400)

api.add_resource(Artworks, '/artworks')

if __name__ == '__main__':
    app.run(port=7000, debug=True)