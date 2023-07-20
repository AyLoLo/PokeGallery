import React, {useState, useEffect} from "react";
import Card from "./Card";

function SetSelected({focusSet, CardFocus}) {

    const [selectedSet, setSelectedSet] = useState([])
    const [setCard, setSetCard] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:7000/sets/${focusSet}`)
        .then(response => response.json())
        .then(selectedSet => setSelectedSet(selectedSet), setSetCard(selectedSet.cards))
    }, [])

    if(!selectedSet.cards){
        return(
            <h1>One moment please ...</h1>
        )
    }

    const cards = selectedSet.cards.map(card =>{
        return <Card card={card} key={card.id} CardFocus={CardFocus}/>
    })

    return (
        <div className="min-h-screen bg-[url('https://c4.wallpaperflare.com/wallpaper/734/586/397/pokemon-unown-pokemon-unown-f-pokemon-wallpaper-thumb.jpg')] bg-no-repeat bg-right-bottom">
            <div className="bg-yellow-400">
                <span className="text-black lg:flex justify-center font-bold lg:text-7xl py-3 animate-pulse">
                    {selectedSet.name}
                </span>
            </div>
            <div className="lg:flex justify-center pt-10 gap-10">
                {cards}
            </div>
        </div>
    )
}

export default SetSelected;