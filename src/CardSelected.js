import React, { useState, useEffect } from "react";
import Artist from "./Artist";

function CardSelected({focusCard, ArtistFocus}) {

    const [selectedCard, setSelectedCard] = useState([])
    const [cardArtist, setCardArtist] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:7000/cards/${focusCard}`)
        .then(response => response.json())
        .then(selectedCard => setSelectedCard(selectedCard), setCardArtist(selectedCard.artists))
    }, [])

    if(!selectedCard.artists){
        return(
            <h1>One Moment please...</h1>
        )
    }

    const artists = selectedCard.artists.map(artist => {
        return <Artist key={artist.id} artist={artist} ArtistFocus={ArtistFocus}/>
    })
    
    return(
        <div className="game-focus">
            <h2 className="text-white">{selectedCard.name}</h2>
            <img className="game-focus-img" src={selectedCard.image} alt="Out Of Paint" />
            <p>{artists}</p>
        </div>
    )
}


export default CardSelected;