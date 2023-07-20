import React, {useState} from "react";

function NewCardForm({updateFormData, updateNewArtwork, updateNewArtist, establishArtwork, addCard, addArtist, cards, artists, sets}){
    
    // True or False Statements when submitting seperate forms
    const [cardSubmitted, setCardSubmitted] = useState(false)
    const [artistSubmitted, setArtistSubmitted] = useState(false)
    const [artworkSubmitted, setArtworkSubmitted] = useState(false)

    const card = cards.map(card => {
        return (
            <div> 
                <li className="py-1 lg:text-lg text-white">
                    ID: {card.id} <br></br>{card.name}
                </li>
            </div>
        )
    })

    const artist = artists.map(artist => {
        return (
            <div>
                <li className="py-1 lg:text-lg text-white">
                    ID: {artist.id} <br></br>{artist.first_name} {artist.last_name}
                </li>
            </div>
        )
    })

    const set = sets.map(set => {
        return (
            <div>
                <li className="py-1 lg:text-lg text-white">
                    ID: {set.id} <br></br> {set.name}
                </li>
            </div>
        )
    })

    return (
        <div className="">
            <div className= "bg-yellow-400 font-bold lg:text-7xl lg:flex justify-center py-5">
                Help Expand The PokéGallery!
            </div>
            <div className="lg:flex justify-evenly min-w-fit">
                {cardSubmitted ? <h1 className="text-white pt-20 lg:text-4xl font-bold animate-pulse">A Pokémon Has Appeared!</h1> :
                <form className="lg:flex justify-start py-5" onSubmit={(event => {
                    addCard(event)
                    setCardSubmitted(cardSubmitted => !cardSubmitted)
                })}>
                <h2 className="text-white font-bold lg:text-3xl py-3 px-5 animate-pulse">Add A New Card!</h2>
                    <div className="text-white border-yellow-400 md:border-4 w-56 py-3 px-3">
                        <label for="card-name">Card Name</label><br></br>
                        <input onChange={updateFormData} type="text" id="name" name="name"></input><br></br>
                        <label for="card-image">Card Image URL</label><br></br>
                        <input onChange={updateFormData} type="text" id="image" name="image"></input><br></br>
                        <label for="card-type">Card Type</label><br></br>
                        <input onChange={updateFormData} type="text" id="card_type" name="type"></input><br></br>
                        <label for="set-id">Booster Set ID</label><br></br>
                        <input onChange={updateFormData} type="number" id="set_id" name="set_id"></input><br></br>
                        <button type="submit">Add New Card</button>
                    </div>
                </form>}
               {artistSubmitted ? <h1 className="text-white pt-20 lg:text-4xl font-bold animate-pulse">A PokéPainter Pitches In!</h1> :
                <form className="lg:flex justify-center py-5 h-48" onSubmit={(event => {
                    addArtist(event)
                    setArtistSubmitted(artistSubmitted => !artistSubmitted)
                })}>
                <h2 className="text-white font-bold lg:text-3xl py-3 px-5 animate-pulse">Add An Artist!</h2>    
                    <div className="text-white border-yellow-400 md:border-4 w-56 py-3 px-3">
                        <label for="Artist-First-Name">Artist First Name</label><br></br>
                        <input onChange={updateNewArtist} type="text" id="first_name" name="first_name"></input><br></br>
                        <label for="Artist-Last-Name">Artist Last Name</label><br></br>
                        <input onChange={updateNewArtist} type="text" id="last_name" name="last_name"></input>
                        <button type="submit">Add New Artist</button>
                    </div>    
                </form>}
                {artworkSubmitted ? <h1 className="text-white pt-20 lg:text-4xl font-bold animate-pulse"> A Poké Mona Lisa!</h1> : 
                <form className="lg-flex justify-end py-5" onSubmit={(event => {
                    establishArtwork(event)
                    setArtworkSubmitted(artworkSubmitted => !artworkSubmitted)
                })}>
                <h2 className="text-white font-bold lg:text-3xl py-3 px-5 animate-pulse">Artworks</h2>
                    <div className="text-white border-yellow-400 md:border-4 w-56 py-3 px-3">
                        <label for="Artist-ID">Artist ID</label><br></br>
                        <input className="text-black" onChange={updateNewArtwork} type="number" id="artist_id" name="artist_id"></input><br></br>
                        <label for="Card-ID">Card ID</label><br></br>
                        <input className="text-black" onChange={updateNewArtwork} type="number" id="card_id" name="card_id"></input><br></br>
                        <button type="submit">Establish Artwork</button>
                    </div>
                </form>}
            </div>
            <div className="bg-yellow-400 py-3 lg:flex justify-evenly bg-[url('https://i.pinimg.com/originals/f5/6a/fb/f56afbea6fdd16a2afed186bf5ba13cb.jpg')] bg-no-repeat bg-right-bottom bg-fixed">
                <div className="border-yellow-400 md:border-4 px-4 bg-black">
                    <h1 className="font-bold lg:text-3xl py-3 text-white">Cards</h1>
                    {card}
                </div>
                <div className="border-yellow-400 md:border-4 px-4 bg-black">    
                    <h1 className="font-bold lg:text-3xl py-3 text-white">Artists</h1>
                    {artist}
                </div>
                <div className="border-yellow-400 md:border-4 px-4 bg-black">
                    <h1 className="font-bold lg:text-3xl py-3 text-white">Sets</h1>
                    {set}
                </div>
            </div>
        </div>
        
    )
}

export default NewCardForm;