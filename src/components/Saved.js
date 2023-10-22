import React, { useEffect, useState } from 'react'
import { doc, onSnapshot , getDoc } from "firebase/firestore";
import {auth , db } from '../firebase'
import ReactHtmlParser from 'react-html-parser';
import '../styling/ReaderText.css'


const Saved = () => {

    const [savedTexts,setSavedTexts] = useState([]);

    const getSavedTexts = async () => {
        const document = await getDoc(doc(db, "users", auth.currentUser.uid));
        setSavedTexts(document.data().savedTexts)
    };

    useEffect(() => {
        getSavedTexts();
    },[])

    const displaySavedTexts = savedTexts.map((text, index) => (<p key={index} style={{ color: 'white' }}>{ReactHtmlParser(text)}</p>))

    return (
        <div className='output-text'>
           <h1>Saved</h1>
           {savedTexts && displaySavedTexts}
        </div>
    )
}

export default Saved

// import React, { useEffect, useState } from 'react'
// import { doc, onSnapshot } from "firebase/firestore";
// import {auth , db } from '../firebase'
// import ReactHtmlParser from 'react-html-parser';

// const Saved = () => {

//     const [savedTexts,setSavedTexts] = useState([]);

//     const getSavedTexts = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
//         setSavedTexts(doc.data().savedTexts)
//     });

//     return (
//         <div>
//            <h1>Saved</h1>
//            {savedTexts.map((text, index) => (<p key={index} style={{ color: 'white' }}>{ReactHtmlParser(text)}</p>))}
//         </div>
//     )
// }

// export default Saved