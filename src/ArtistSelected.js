import React, {useState, useEffect} from "react";
import Card from "./Card";


function ArtistSelected({focusArtist, CardFocus}) {
    
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
        <div className="min-h-screen bg-[url('https://c4.wallpaperflare.com/wallpaper/734/586/397/pokemon-unown-pokemon-unown-f-pokemon-wallpaper-thumb.jpg')] bg-no-repeat bg-right-bottom">
            <div className="bg-yellow-400">
                <span className="text-black lg:flex justify-center font-bold lg:text-7xl py-3 animate-pulse">
                    {selectedArtist.first_name} {selectedArtist.last_name}
                </span>
            </div>
            <div className="lg:flex justify-center pt-10 gap-10">
                {cards}
            </div>
        </div>
    )
}
export default ArtistSelected;