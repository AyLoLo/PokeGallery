import React from "react";
import { NavLink } from "react-router-dom";

function Nav({currentUser, logout}){
    
    return (
        <ul className="border-black md:border-4 bg-black text-white w-full justify-between lg:flex px-40 lg:text-3xl py-1">
            <NavLink  to="/"> Home </NavLink>
            <NavLink to="/cards"> Card Gallery </NavLink>
            <NavLink to="/artists"> PokéArtists </NavLink>
            <NavLink to="/sets"> Booster Boxes </NavLink>
            { !currentUser ? <NavLink to="/login"> Login </NavLink> : null }
            { !currentUser ? <NavLink to="/signup"> Signup </NavLink> : null }
            { currentUser ? <NavLink to="/user_page">User Page</NavLink> : null }
            { currentUser ? <NavLink to="/new_card">Add New Art</NavLink> : null }
            { currentUser ? <button onClick={logout}>Log Out</button> : null }

        </ul>
    );
}

export default Nav;