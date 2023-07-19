import React, { useState } from "react";


function Signup({attemptSignup}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signupSuccessful, setSignupSuccessful] = useState(false)

    const handleChangeUsername = event => setUsername(event.target.value)
    const handleChangePassword = event => setPassword(event.target.value)

    function handleSubmit(event) {
        event.preventDefault()
        attemptSignup({username, password})
    }
    
    return (
        <div>
            <div>    
                <h2 className="text-black font-bold border-red-950 md:border-4 lg:flex justify-center lg:text-7xl py-3 italic bg-yellow-400">The PokéGallery</h2>
            </div>    
                <h6 className="text-white lg:flex justify-center lg:text-5xl py-6">Signup Here</h6>
                {signupSuccessful ? <h1 className="text-white lg:flex justify-center lg:text-7xl">Welcome {username}!</h1> :
                <form className="lg:flex justify-center bg-[url('https://i.pinimg.com/originals/ee/52/86/ee5286dd15598789e61ed4f01ee3ba25.jpg')] bg-no-repeat bg-fixed bg-center min-h-screen"onSubmit={(event =>{
                    handleSubmit(event)
                    setSignupSuccessful(signupSuccessful => !signupSuccessful)
                })}>
                        <div className="bg-yellow-400 border-red-950 md:border-4 h-32">
                            <label className="text-red-950 lg:flex justify-center">Username</label>
                            <input className= "lg:flex text-center w-72" type="text" onChange={handleChangeUsername} value={username} placeholder="Username Goes Here!"/>
                            <label className="text-red-950 lg:flex justify-center">Password</label>
                            <input className="lg:flex text-center w-72" type="text" onChange={handleChangePassword} value={password} placeholder="Password Goes Here!"/>
                            <input className="text-red-950 text-center" value="Signup" type="submit"/>
                        </div>
                </form>}
        </div>
    );
}

export default Signup;