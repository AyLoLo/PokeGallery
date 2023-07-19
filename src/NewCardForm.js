import React, {useState} from "react";

function NewCardForm({updateFormData, updateNewArtwork, updateNewArtist, establishArtwork, addCard, addArtist, cards, artists, sets}){
    
    // True or False Statements when submitting seperate forms
    const [cardSubmitted, setCardSubmitted] = useState(false)
    const [artistSubmitted, setArtistSubmitted] = useState(false)
    const [artworkSubmitted, setArtworkSubmitted] = useState(false)

    const card = cards.map(card => {
        return (
            <body> 
                <li>
                    ID: {card.id} <br></br>Name:{card.name}
                </li>
            </body>
        )
    })

    const artist = artists.map(artist => {
        return (
            <body>
                <li>
                    ID: {artist.id} <br></br>{artist.first_name} {artist.last_name}
                </li>
            </body>
        )
    })

    const set = sets.map(set => {
        return (
            <body>
                <li>
                    ID: {set.id} <br></br> {set.name}
                </li>
            </body>
        )
    })

    return (
        <div className="game-form">
            <body className="game-card">
                <h2>Paint It Up</h2>
                {cardSubmitted ? <h1>Smeargle With Another Masterpiece!</h1> :
                <form className="contact-form" onSubmit={(event => {
                    addCard(event)
                    setCardSubmitted(cardSubmitted => !cardSubmitted)
                })}>
                    <div className="form-group">
                        <label for="card-name">Card Name</label><br></br>
                        <input onChange={updateFormData} type="text" id="name" name="name"></input><br></br>
                    </div>
                    <div className="form-group">
                        <label for="card-image">Card Image URL</label><br></br>
                        <input onChange={updateFormData} type="text" id="image" name="image"></input><br></br>
                    </div>
                    <div className="form-group">
                        <label for="card-type">Card Type</label><br></br>
                        <input onChange={updateFormData} type="text" id="card_type" name="type"></input><br></br>
                    </div>
                    <div className="form-group">
                        <label for="set-id">Booster Set ID</label><br></br>
                        <input onChange={updateFormData} type="number" id="set_id" name="set_id"></input><br></br>
                    </div>
                        <button type="submit">Add New Card Art</button>
                </form>}
                <h2>Add Poke Painter!</h2>
                {artistSubmitted ? <h1>A Poke Painter Pitches In!</h1> :
                <form className="contact-form" onSubmit={(event => {
                    addArtist(event)
                    setArtistSubmitted(artistSubmitted => !artistSubmitted)
                })}>
                    <div className="form-group">
                        <label for="Artist-First-Name">Artist First Name</label><br></br>
                        <input onChange={updateNewArtist} type="text" id="first_name" name="first_name"></input><br></br>
                    </div>
                    <div className="form-group">
                        <label for="Artist-Last-Name">Artist Last Name</label><br></br>
                        <input onChange={updateNewArtist} type="text" id="last_name" name="last_name"></input>
                    </div>
                        <button type="submit">Add New Artist</button>
                </form>}
                <h2>The Art And The Artist</h2> 
                {artworkSubmitted ? <h1> A Poke Mona Lisa!</h1> : 
                <form className="contact-form" onSubmit={(event => {
                    establishArtwork(event)
                    setArtworkSubmitted(artworkSubmitted => !artworkSubmitted)
                })}>
                    <div className="form-group">
                        <label for="Artist-ID">Artist ID</label><br></br>
                        <input onChange={updateNewArtwork} type="number" id="artist_id" name="artist_id"></input><br></br>
                    </div>
                    <div className="form-group">
                        <label for="Card-ID">Card ID</label><br></br>
                        <input onChange={updateNewArtwork} type="nummber" id="card_id" name="card_id"></input><br></br>
                    </div>
                        <button type="submit">Establish Artwork</button>
                </form>}
            </body>
            <body className="game-card">
                <h1>Cards</h1>
                {card}
                <h1>Artists</h1>
                {artist}
                <h1>Set</h1>
                {set}
            </body>
        </div>
        
    )
}

export default NewCardForm;