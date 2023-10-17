import React, { useState } from 'react';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth , db } from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 


const Register = ({handleLoginStatus}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [picture,setPicture] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName:name, photoURL:picture
            })
            console.log(auth.currentUser);
            handleLoginStatus();
            // await setDoc(doc(db,"users",response.user.uid))
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        }

    }
 
    return (
        <div className='Register'>
            <h3>Register</h3>
            <form onSubmit={handleRegister}>
                <input type='email' placeholder='email' onChange={(event) => {setEmail(event.target.value)}}></input>
                <input type='password' placeholder='password' onChange={(event) => {setPassword(event.target.value)}}></input>
                <input type='name' placeholder='name' onChange={(event) => {setName(event.target.value)}}></input>
                <input type='picture' placeholder='picture' onChange={(event) => {setPicture(event.target.value)}}></input>
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register