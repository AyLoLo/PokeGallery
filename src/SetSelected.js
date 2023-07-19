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
        <div className="game-focus">
            <h2 className="text-white">{selectedSet.name}</h2>
            {cards}
        </div>
    )
}

export default SetSelected;