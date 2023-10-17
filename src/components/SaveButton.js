import React from 'react'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {auth , db } from '../firebase'


const SaveButton = ({response}) => {

    const savedTextsRef = doc(db,"users",auth.currentUser.uid);

    const handleAdd = async(event) => {
        event.preventDefault();
        try {
            await updateDoc(savedTextsRef , {
                savedTexts: arrayUnion(response)
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleAdd}>Save</button>
    )
}

export default SaveButton