import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import '../styling/Login.css'

const Login = ({handleLoginStatus}) => {

    const [error,setError] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            handleLoginStatus()
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            setError(true)
            const errorMessage = error.message;
            alert("Incorrect email or password. Please try again")
            console.log(errorMessage);
        });
    }
 
    return (
        <div className='login'>
            <h3 style={{paddingBottom:'5px'}}>Login</h3>
            <form onSubmit={handleLogin} className="form">
                <input type='email' placeholder='Email' className="input-field" onChange={(event) => {setEmail(event.target.value)}}></input>
                <input type='password' placeholder='Password' className="input-field" onChange={(event) => {setPassword(event.target.value)}}></input>
                <button type='submit' className="login-button">Log in</button>
                {error && <span>Wrong email or password</span>}
            </form>
        </div>
    )
}

export default Login