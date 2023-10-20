import React, { useState } from 'react';
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import {auth , db } from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import '../styling/Login.css'


const Register = ({handleLoginStatus}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [picture,setPicture] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, {
                displayName:name, photoURL:picture
            })
            await setDoc(doc(db,"users",auth.currentUser.uid),{
                name: auth.currentUser.displayName,
                savedTexts: []
            })
            console.log(auth.currentUser);
            handleLoginStatus();
            // await setDoc(doc(db,"users",response.user.uid))
        } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        }

    }
 
    return (
        <div className='Register'>
            <h3>Register</h3>
            <form onSubmit={handleRegister} className="form">
                <input type='email' placeholder='email' className="input-field" onChange={(event) => {setEmail(event.target.value)}}></input>
                <input type='password' placeholder='password' className="input-field" onChange={(event) => {setPassword(event.target.value)}}></input>
                <input type='name' placeholder='name' className="input-field" onChange={(event) => {setName(event.target.value)}}></input>
                <input type='picture' placeholder='picture' className="input-field" onChange={(event) => {setPicture(event.target.value)}}></input>
                <button type='submit' className="login-button">Register</button>
            </form>
        </div>
    )
}

export default Register