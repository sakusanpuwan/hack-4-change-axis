import React, { useState } from 'react'
import '../App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import ReaderText from './ReaderText'
import ReaderAudio from './ReaderAudio'
import WriterText from './WriterText'
import WriterAudio from './WriterAudio'
import {auth , db } from '../firebase'
import { signOut } from 'firebase/auth'


const NavBar = () => {

    const [loginStatus,setLoginStatus] = useState(false);

    const handleLoginStatus = () => {
        setLoginStatus(!loginStatus);
    }

    return (
        <div>
            <nav className='sidebar'>
            <h2>AXIS</h2>
            {loginStatus && auth.currentUser !== null ?         
            <div className='profile'> 
                <img src={auth.currentUser.photoURL} width={'40px'} style= {{borderRadius: "50%"}}></img>
                <h3>{auth.currentUser.displayName}</h3>
            </div>
            :
            <h4>Hey</h4>
            }
            <ul className='navbar'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/reader-text">Reader Text</Link></li>
                <li><Link to="/reader-audio">Reader Audio</Link></li>
                <li><Link to="/writer-text">Writer Text</Link></li>
                <li><Link to="/writer-audio">Writer Audio</Link></li>
            </ul>
            {loginStatus && <button onClick={() => {
                signOut(auth);
                handleLoginStatus();
            }
            }>Log out</button>}
        </nav>

        <Routes>
            <Route exact path='/' element={<Home handleLoginStatus = {handleLoginStatus}/>}/>
            <Route path='/reader-text' element={<ReaderText/>}/>
            <Route path='/reader-audio' element={<ReaderAudio/>}/>
            <Route exact path='/writer-text' element={<WriterText/>}/>
            <Route exact path='/writer-audio' element={<WriterAudio/>}/>
        </Routes>
    </div>
    )
}

export default NavBar