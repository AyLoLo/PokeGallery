import React from "react";
import Set from "./Set";

function SetList({sets, SetFocus}){
    
    const set = sets.map(set => {
        return <Set key={set.id} set={set} SetFocus={SetFocus}/>
    })
    
    return (
        <div>
            <div className="border-red-950 md:border-4">
                <div className="bg-yellow-400 text-black font-bold lg:text-9xl pl-8 pt-10">Pokémon Booster Sets</div>
                <div className="bg-yellow-400 text-black italic pl-10 lg:text-2xl" >...Making It's First Release In 1999!</div>
            </div>
            <div className="text-white grid bg-[url('https://wallpapercave.com/wp/wp2528297.jpg')] bg-no-repeat bg-right-bottom bg-fixed grid-rows-3 grid-cols-3 justify-center items-center  pt-10 pl-80 lg:text-4xl min-h-screen">
                {set}            
            </div>
        </div>
    )
}

export default SetList;