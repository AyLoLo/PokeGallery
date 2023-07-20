import React from "react";
import Card from "./Card";

function Artist({artist, ArtistFocus}) {
    
    return (
        <div className="developer-card">
            <h2 className="text-white cursor-pointer lg:text-4xl border-yellow-400 md:border-4 py-3 px-2 bg-black max-w-fit" onClick={ArtistFocus} id={artist.id}> {artist.first_name} {artist.last_name}</h2>
        </div>
    )
}

export default Artist;