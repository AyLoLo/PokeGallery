import React from "react";
import Card from "./Card";

function Home({cards}) {

    const card = cards.map(card => {
        return <Card card={card} key={card.id} />
    })

    return (
        <div>
            <div className="border-red-950 md:border-4">
                <span className="text-black bg-yellow-400 font-bold lg:text-7xl lg:flex justify-center py-7">
                    Welcome to the PokéGallery Home Page! 
                </span>
                <span className="text-black bg-yellow-400 italic lg:text-2xl lg:flex justify-center py-2">
                    This is your go-to website for the unique art from the PokémonTCG series!
                </span>
            </div>
            <div className="bg-[url('https://cdn.wallpapersafari.com/89/47/eLChZc.png')] relative bg-no-repeat bg-fixed bg-center grid grid-rows-3 grid-cols-3 justify-center items-center gap-20 pl-28 pt-10">
                {card}
            </div>
        </div>
    )
}

export default Home;