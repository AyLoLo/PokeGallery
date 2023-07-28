from app import app
from models import db, Card, Artist, Set, Artwork, User

with app.app_context():

    Card.query.delete()
    Artist.query.delete()
    Set.query.delete()
    Artwork.query.delete()
    User.query.delete()

    sets = []
    sets.append(Set(name="Neo Destiny", release_year=2002))
    sets.append(Set(name="Aquapolis", release_year=2003))
    sets.append(Set(name="Team Rocket", release_year=2000))
    sets.append(Set(name="Neo Discovery", release_year=2001))
    sets.append(Set(name="Fossil", release_year=1999))
    sets.append(Set(name="Base Set", release_year=1999))
    sets.append(Set(name="Miscellaneous/Promo", release_year=1998))
    sets.append(Set(name="Unseen Forces", release_year=2005))
    sets.append(Set(name="Crown Zenith", release_year=2023))
    sets.append(Set(name="Team Up", release_year=2019))

    cards = []
    cards.append(Card(name="Dark Ampharos", image="https://i.ibb.co/TLnQ2g1/Dark-Ampharos.jpg", card_type="Pokemon", set_id=1))
    cards.append(Card(name="Shining Kabutops", image="https://i.ibb.co/BskvhCY/Shining-Kabutops.jpg", card_type="Pokemon", set_id=1))
    cards.append(Card(name="Houndoom", image="https://i.ibb.co/WnWh90b/Houndoom.jpg", card_type="Pokemon", set_id=2))
    cards.append(Card(name="Dark Hypno", image="https://i.ibb.co/qDpNdWp/Dark-Hypno.jpg", card_type="Pokemon", set_id=3))
    cards.append(Card(name="Espeon", image="https://i.ibb.co/pK7vct1/Espeon.jpg", card_type="Pokemon", set_id=4))
    cards.append(Card(name="Politoed", image="https://i.ibb.co/j4QDjYq/Politoed.jpg", card_type="Pokemon", set_id=4))
    cards.append(Card(name="Slowpoke", image="https://i.ibb.co/LkLrkSR/Slowpoke-Fossil.jpg", card_type="Pokemon", set_id=5))
    cards.append(Card(name="Kakuna", image="https://i.ibb.co/tsp3DpM/Kakuna-BS.jpg", card_type="Pokemon", set_id=6))
    cards.append(Card(name="Larvitar", image="https://i.ibb.co/QfY14S7/Larvitar-Aquapolis.jpg", card_type="Pokemon", set_id=2))
    cards.append(Card(name="Ancient Mew", image="https://i.ibb.co/VpyQWk4/Ancient-Mew-Promo.jpg", card_type="Pokemon", set_id=7))
    cards.append(Card(name="Scoop Up", image="https://i.ibb.co/FVXn6CJ/Scoop-Up-Base-Set.jpg", card_type="Trainer", set_id=6))
    cards.append(Card(name="Lugia ex", image="https://i.ibb.co/9YjZmnq/Lugia-ex.jpg", card_type="Pokemon", set_id=8))
    cards.append(Card(name="Lapras", image="https://i.ibb.co/LJv6QfD/Lapras.jpg", card_type="Pokemon", set_id=9))
    cards.append(Card(name="Squirtle", image="https://i.ibb.co/DLnpyvy/Squirtle-BS.jpg", card_type="Pokemon", set_id=6))
    cards.append(Card(name="Erika's Hospitality", image="https://i.ibb.co/QMxvfd9/Erika-s-Hospitality.jpg", card_type="Supporter", set_id=10))

    artists = []
    artists.append(Artist(first_name="Kagemaru", last_name="Himeno"))
    artists.append(Artist(first_name="Hironobu", last_name="Yoshida"))
    artists.append(Artist(first_name="Hajime", last_name="Kusajima"))
    artists.append(Artist(first_name="Atsuko", last_name="Nishida"))
    artists.append(Artist(first_name="Tomokazu", last_name="Komiya"))
    artists.append(Artist(first_name="Miki", last_name="Takano"))
    artists.append(Artist(first_name="Keiji", last_name="Kinebuchi"))
    artists.append(Artist(first_name="Naoyo", last_name="Kimura"))
    artists.append(Artist(first_name="Artist", last_name="Unknown"))
    artists.append(Artist(first_name="Hikaru", last_name="Koike"))
    artists.append(Artist(first_name="Mister", last_name="zig"))
    artists.append(Artist(first_name="Mitsuhiro", last_name="Arita"))
    artists.append(Artist(first_name="Sanosuke", last_name="Sakuma"))
    artists.append(Artist(first_name="Mitsuhiro", last_name="Arita"))

    artworks = []
    artworks.append(Artwork(artist_id=1, card_id=1))
    artworks.append(Artwork(artist_id=2, card_id=2))
    artworks.append(Artwork(artist_id=3, card_id=3))
    artworks.append(Artwork(artist_id=1, card_id=4))
    artworks.append(Artwork(artist_id=4, card_id=5))
    artworks.append(Artwork(artist_id=5, card_id=6))
    artworks.append(Artwork(artist_id=6, card_id=7))
    artworks.append(Artwork(artist_id=7, card_id=8))
    artworks.append(Artwork(artist_id=8, card_id=9))
    artworks.append(Artwork(artist_id=9, card_id=10))
    artworks.append(Artwork(artist_id=7, card_id=11))
    artworks.append(Artwork(artist_id=10, card_id=12))
    artworks.append(Artwork(artist_id=11, card_id=13))
    artworks.append(Artwork(artist_id=12, card_id=14))
    artworks.append(Artwork(artist_id=13, card_id=15))

    users = []

    db.session.add_all(sets)
    db.session.add_all(cards)
    db.session.add_all(artists)
    db.session.add_all(artworks)
    db.session.add_all(users)
    db.session.commit()
    print("🌱 Successfully seeded! 🌱")