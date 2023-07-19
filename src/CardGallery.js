import React from "react";
import Card from "./Card";

function CardGallery({cards, CardFocus}){

    const card = cards.map(card => {
        return <Card card={card} key={card.id} CardFocus={CardFocus}/>
    })

    return(
        <div className="bg-[url('https://wallpapercave.com/wp/wp2528297.jpg')] bg-no-repeat bg-right-bottom bg-fixed grid grid-rows-3 grid-cols-3 justify-center items-center gap-20 pl-28 pt-10">
            {card}
        </div>
    )
}



export default CardGallery;