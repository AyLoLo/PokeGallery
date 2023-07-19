import React from "react";
import Artist from "./Artist";


function ArtistList({artists, ArtistFocus}){

    const artist = artists.map(artist => {
        return <Artist key={artist.id} artist={artist} ArtistFocus={ArtistFocus}/>
    })

    return (
        <div>
            <div className="border-red-950 md:border-4">
                <div className="bg-yellow-400 text-black lg:text-9xl pl-8  pt-10 font-bold">Pokémon Artists</div>
                <div className="bg-yellow-400 text-black italic pl-10 lg:text-2xl">...And their expressions through digital and traditional artworks.</div>
            </div>
            <div className="bg-[url('https://wallpapercave.com/wp/wp2528297.jpg')] bg-no-repeat bg-right-bottom bg-fixed grid grid-rows-3 grid-cols-4 justify-center items-center  gap-32 min-h-screen pl-32">
                    {artist}
            </div>
       </div>
    )
}

export default ArtistList;