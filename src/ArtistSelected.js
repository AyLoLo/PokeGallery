import React, {useState, useEffect} from "react";
import Card from "./Card";


function ArtistSelected({focusArtist, CardFocus, SetFocus}) {
    
    const [selectedArtist, setSelectedArtist] = useState([])
    const [artistWorks, setArtistWorks] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:7000/artists/${focusArtist}`)
        .then(response => response.json())
        .then(selectedArtist => setSelectedArtist(selectedArtist), setArtistWorks(selectedArtist.cards))
    }, [])

    if(!selectedArtist.cards){
        return(
            <h1>One Moment please...</h1>
        )
    }

    const cards = selectedArtist.cards.map(card => {
        return <Card key={card.id} card={card} CardFocus={CardFocus}/>
    })

    return  (
        <div className="game-focus">
            <h2 className="text-white">{selectedArtist.first_name} {selectedArtist.last_name}</h2>
            <div>{cards}</div>
        </div>
    )
}
export default ArtistSelected;