import React from "react";

function Set({set, SetFocus}) {

    return (
        <div className="bg-black max-w-fit border-yellow-400 md:border-4 py-3 px-3">
            <h2 className="cursor-pointer" onClick={SetFocus} id={set.id}>{set.name}</h2>
        </div>
    )
}

export default Set;