import React, { useState } from "react";

function Login({attemptLogin}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginSuccessful, setLoginSucessful] = useState(false)

    const handleChangeUsername = event => setUsername(event.target.value)
    const handleChangePassword = event => setPassword(event.target.value)

    function handleSubmit(event) {
        event.preventDefault()
        attemptLogin({username, password})
    }

    return (
        <div>
            <div>    
                <h2 className="text-black font-bold border-red-950 md:border-4 lg:flex justify-center lg:text-7xl py-3 italic bg-yellow-400">The PokéGallery</h2>
            </div>
                <h6 className="text-white lg:flex justify-center lg:text-5xl py-6">Login Here</h6>
                {loginSuccessful ? <h1 className="text-white lg:flex justify-center lg:text-7xl">Invalid Username Or Password</h1> :
                <form className="lg:flex justify-center bg-[url('https://i.pinimg.com/originals/ee/52/86/ee5286dd15598789e61ed4f01ee3ba25.jpg')] bg-no-repeat bg-fixed bg-center min-h-screen" onSubmit={(event =>{
                handleSubmit(event)
                setLoginSucessful(loginSuccessful => !loginSuccessful)
                })}>
                    <div className="bg-yellow-400 border-red-950 md:border-4 h-32">
                        <label className="text-red-950 lg:flex justify-center">Username</label>
                        <input className="lg:flex text-center w-72" type="text" onChange={handleChangeUsername} value={username} placeholder="Username Goes Here!"/>
                        <label className="text-red-950 lg:flex justify-center">Password</label>
                        <input className="lg:flex text-center w-72" type="text" onChange={handleChangePassword} value={password} placeholder="Password Goes Here!"/>
                        <button className="text-red-950 lg:flex" type="submit">Login</button>
                    </div>
                </form>}
        </div>
    );
}

export default Login;