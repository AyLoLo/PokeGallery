import React from "react";

function UserPage({currentUser}){


    return (
        <div>
            <div className="text-black font-bold border-red-950 md:border-4 lg:flex justify-center lg:text-7xl py-3 italic bg-yellow-400">
                    <span>Welcome {currentUser.username}!</span>
            </div>
        </div>
    )
}

export default UserPage;
