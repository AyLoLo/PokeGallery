import React from "react";

function LatestCard({latestCard, CardFocus}) {

    return (
        
        <div className="bg-black max-w-fit border-yellow-400 md:border-4 py-3 px-3 relative">
            <img className="cursor-pointer" onClick={CardFocus} src={latestCard.image} alt={latestCard.id}/>
        </div>
    )

}

export default LatestCard;