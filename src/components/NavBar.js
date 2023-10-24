import React, { useState } from 'react'
import '../App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import ReaderText from './ReaderText'
import ReaderAudio from './ReaderAudio'
import WriterText from './WriterText'
import WriterAudio from './WriterAudio'
import AudioTranscript from './AudioTranscript'
import {auth} from '../firebase'
import { signOut } from 'firebase/auth'
import Saved from './Saved'
import AuthForm from './AuthForm'


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
                <img src={auth.currentUser.photoURL} width={'40px'} style= {{borderRadius: "50%"}} alt='profile-pic'></img>
                <h3>{auth.currentUser.displayName}</h3>
            </div>
            :
            <Link to="/auth-form">
            <button type="button">
                 Sign In
            </button>
            </Link>
            }
            <ul className='navbar'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/writer-audio">Writer Audio</Link></li>
                <li><Link to="/audio-transcript">Audio Transcript</Link></li>
                <li><Link to="/writer-text">Writer Text</Link></li>
                <li><Link to="/reader-text">Reader Text</Link></li>
                <li><Link to="/reader-audio">Reader Audio</Link></li>
                {loginStatus && <li><Link to="/saved">Saved</Link></li>}
            </ul>
            {loginStatus && <button onClick={() => {
                signOut(auth);
                handleLoginStatus();
            }
            }>Log out</button>}
        </nav>

        <Routes>
            <Route exact path='/' element={<Home handleLoginStatus = {handleLoginStatus}/>}/>
            <Route exact path='/writer-audio' element={<WriterAudio/>}/>
            <Route exact path='/audio-transcript' element={<AudioTranscript/>}/>
            <Route exact path='/writer-text' element={<WriterText/>}/>
            <Route path='/reader-text' element={<ReaderText/>}/>
            <Route path='/reader-audio' element={<ReaderAudio/>}/>
            <Route exact path='/saved' element={<Saved/>}/>
            <Route path='/auth-form' element={<AuthForm handleLoginStatus = {handleLoginStatus}/>}/>
        </Routes>
    </div>
    )
}

export default NavBar