import React from 'react'
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {auth , db } from '../firebase'
import '../App.css'


const SaveButton = ({response}) => {
    

    const handleAdd = async(event) => {
        event.preventDefault();
        if (auth.currentUser !== null) {
            try {
                const savedTextsRef = doc(db,"users",auth.currentUser.uid);
                await updateDoc(savedTextsRef , {
                    savedTexts: arrayUnion(response)
                })
                console.log(auth.currentUser);
            } catch (error) {
                console.log(error);
            }
        } else{
            alert("Sign in");
        }

    }

    return (
        <button onClick={handleAdd} className='save-button'>Save</button>
    )
}

export default SaveButton