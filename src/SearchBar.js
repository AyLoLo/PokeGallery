import React from "react";

function SearchBar({updateSearchText, searchText}) {
    return (
        <div className="border-red-950 md:border-4">
            <label className="text-black font-bold bg-yellow-400 pl-5 lg:flex justify-center lg:text-5xl py-3" htmlFor="search">Search Card Name</label>
            <div>
                <input type="text" placeholder="Pika Pika! (Type The Pokémon Name You Are Looking For Here!)" className="border-black md:border-4 min-w-full lg:flex justify-center text-center lg:text-3xl py-2" onChange={updateSearchText} value={searchText}/>
            </div>
        </div>
    );
}

export default SearchBar;