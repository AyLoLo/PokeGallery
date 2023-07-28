import './index.css';
import {useState, useEffect} from 'react';
import {Route, Switch, useHistory} from "react-router-dom";

import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import SearchBar from './SearchBar';
import CardGallery from './CardGallery';
import CardSelected from './CardSelected';
import NewCardForm from './NewCardForm';
import ArtistList from './ArtistList';
import ArtistSelected from './ArtistSelected';
import SetList from './SetList';
import SetSelected from './SetSelected';
import Signup from './Signup';
import UserPage from './UserPage';




function App() {

  const history = useHistory()  

  const [cards, setCards] = useState([])
  const [artists, setArtists] = useState([])
  const [sets, setSets] = useState([])
  const [artworks, setArtworks] = useState([])

  const [searchText, setSearchText] = useState("")

  const [currentUser, setCurrentUser] = useState(null)

  const [formData, setFormData] = useState({
        name: "Smeargle",
        image: "https://i.ibb.co/ZdYKjzs/Smeargle.jpg",
        card_type: "Pokemon",
        set_id: 7
  })

  const [newArtwork, setNewArtwork] = useState({})
  
  const [newArtist, setNewArtist] = useState({
        first_name: "Smeargle",
        last_name: "Himself!"
  })

  const [focusCard, setFocusCard] = useState('')
  const [focusArtist, setFocusArtist] = useState('')
  const [focusSet, setFocusSet] = useState('')


    useEffect(() => {
        fetch('http://127.0.0.1:7000/cards')
            .then(response => response.json()) 
            .then(cardData => setCards(cardData))
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:7000/artists')
            .then(response => response.json())
            .then(artistData => setArtists(artistData))
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:7000/sets')
            .then(response => response.json())
            .then(setData => setSets(setData))
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:7000/artworks')
            .then(response => response.json())
            .then(artworksData => setArtworks(artworksData))
    }, [])

    useEffect(() => {
        fetch('/current_session')
        .then(response => {
            if (response.ok) {
                response.json()
                .then(user => setCurrentUser(user))
            }
        })
    }, [])

    function attemptLogin(userInfo) {
        fetch('/login', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => {
            if (response.ok) {
                response.json()
                .then(user => setCurrentUser(user))
                history.push('/user_page')
            }
        })
    }

    function attemptSignup(userInfo) {
        fetch('/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => {
            if (response.ok) {
                response.json()
                .then(user => setCurrentUser(user))
                history.push('/user_page')
            }
        })
    }

    function logout() {
        setCurrentUser(null)
        fetch('/logout', { method: "DELETE"})
        history.push('/')
    }


    function CardFocus(event){
        setFocusCard(event.target.alt)
        history.push('/cardfocus')
    }

    function ArtistFocus(event){
        setFocusArtist(event.target.id)
        history.push('/artistfocus')
    }

    function SetFocus(event){
        setFocusSet(event.target.id)
        history.push('/setfocus')
    }

    // UPDATE DATA AND ADD NEW OBJECTS

    function updateFormData(event){
        setFormData({...formData, [event.target.id]: event.target.value})
    }

    function updateNewArtwork(event){
        setNewArtwork({...newArtwork, [event.target.name]: event.target.value})
    }

    function updateNewArtist(event){
        setNewArtist({...newArtist, [event.target.name]: event.target.value})
    }

    function addCard(event){
        event.preventDefault()

        fetch("http://localhost:7000/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(newCard => setCards([...cards, newCard]))
    }

    function establishArtwork(event){
        event.preventDefault()

        fetch("http://localhost:7000/artworks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newArtwork)
        })
        .then(response => response.json())
        .then(newArtwork => setArtworks([...artworks, newArtwork]))
    }

    function addArtist(event){
        event.preventDefault()

        fetch("http://localhost:7000/artists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newArtist)
        })
        .then(response => response.json())
        .then(newArtist => setArtists([...artists, newArtist]))
    }

    // SEARCH TEXT FUNCTIONS

    const filteredCards = cards.filter(card => {
        if(searchText === ""){
            return true
        } else {
            return card.name.toLowerCase().includes(searchText.toLowerCase()) || card.card_type.toLowerCase().includes(searchText.toLowerCase())
        }
    })

    function updateSearchText(event){
        setSearchText(event.target.value)
    }



    return(
        <div className='app overflow-hidden h-full w-full'>
            <div>
                <Nav currentUser={currentUser} logout={logout}/>
            </div>
            <Switch>
                <Route exact path="/">
                    <Home cards={cards} CardFocus={CardFocus}/>
                </Route>
                <Route exact path="/login">
                    { !currentUser ? <Login attemptLogin={attemptLogin} /> : null }
                </Route>
                <Route exact path="/signup">
                    { !currentUser ? <Signup attemptSignup={attemptSignup}/> : null}
                </Route>
                <Route exact path="/user_page">
                    { currentUser ? <UserPage currentUser={currentUser}/> : null}
                </Route>
                <Route exact path="/cards">
                    <SearchBar updateSearchText={updateSearchText} searchText={searchText} />
                    <CardGallery cards={filteredCards} CardFocus={CardFocus}/>
                </Route>
                <Route exact path="/cardfocus">
                    <CardSelected focusCard={focusCard} ArtistFocus={ArtistFocus} SetFocus={SetFocus}/>
                </Route>
                <Route exact path="/artists">
                    <ArtistList artists={artists} ArtistFocus={ArtistFocus}/>
                </Route>
                <Route exact path="/artistfocus">
                    <ArtistSelected focusArtist={focusArtist} CardFocus={CardFocus}/>
                </Route>
                <Route exact path="/sets">
                    <SetList sets={sets} SetFocus={SetFocus}/>
                </Route>
                <Route exact path="/setfocus">
                    <SetSelected focusSet={focusSet} CardFocus={CardFocus}/>
                </Route>
                <Route exact path="/new_card">
                    <NewCardForm updateFormData={updateFormData} updateNewArtist={updateNewArtist} updateNewArtwork={updateNewArtwork} establishArtwork={establishArtwork} addCard={addCard} addArtist={addArtist} cards={cards} artists={artists} sets={sets}/>
                </Route>    
            </Switch>


        </div>
    );
}

export default App;
