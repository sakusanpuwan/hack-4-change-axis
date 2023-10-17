import React, { useState } from 'react';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'

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
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
 
    return (
        <div className='login'>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <input type='email' placeholder='email' onChange={(event) => {setEmail(event.target.value)}}></input>
                <input type='password' placeholder='password' onChange={(event) => {setPassword(event.target.value)}}></input>
                <button type='submit'>Login</button>
                {error && <span>Wrong email or password</span>}
            </form>
        </div>
    )
}

export default Login