import React, { useState, useEffect } from "react";
import Artist from "./Artist";
import Set from "./Set";

function CardSelected({focusCard, ArtistFocus, SetFocus}) {

    const [selectedCard, setSelectedCard] = useState([])
    const [cardArtist, setCardArtist] = useState([])
    const [cardSet, setCardSet] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:7000/cards/${focusCard}`)
        .then(response => response.json())
        .then(selectedCard => setSelectedCard(selectedCard), setCardArtist(selectedCard.artists), setCardSet(selectedCard.sets))
    }, [])

    if(!selectedCard.artists){
        return(
            <h1>One Moment please...</h1>
        )
    }

    const artists = selectedCard.artists.map(artist => {
        return <Artist key={artist.id} artist={artist} ArtistFocus={ArtistFocus}/>
    })

    const sets = selectedCard.sets.map(set => {
        return <Set key={set.id} set={set} SetFocus={SetFocus}/>
    })
    
    return(
        <div className="min-h-screen bg-[url('https://c4.wallpaperflare.com/wallpaper/734/586/397/pokemon-unown-pokemon-unown-f-pokemon-wallpaper-thumb.jpg')] bg-no-repeat bg-right-bottom">
            <div className="bg-yellow-400">
                <span className="text-black lg:flex justify-center font-bold lg:text-7xl py-3 animate-pulse">
                    {selectedCard.name}
                </span>
            </div>
            <div className="lg:flex justify-center pt-10">
                <img className="border-yellow-400 md:border-4 py-3 px-3" src={selectedCard.image}/>
            </div>
            <div className="lg:flex justify-center pt-10 gap-10">
                {artists} {sets}
            </div>
        </div>
    )
}


export default CardSelected;