import React from "react";

function Card({card, CardFocus}) {

    return (
        
        <div className="bg-black max-w-fit border-yellow-400 md:border-4 py-3 px-3 relative">
            <img className="cursor-pointer" onClick={CardFocus} src={card.image} alt={card.id}/>
        </div>
    )

}

export default Card;