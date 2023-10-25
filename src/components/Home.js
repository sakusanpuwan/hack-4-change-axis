import { Link } from 'react-router-dom';
import '../styling/Home.css'

const Home = () => {
    return (
        <div className='home-container'>
            <div className='info'>
                <br></br>
                <h1>Unlocking Inclusivity Through</h1>
                <h1>AI-Powered Literacy</h1>
                <p style={{fontSize:'small'}}>Step into a digital realm where inclusivity isn't just an aspiration, but an everyday reality. Our platform harnesses the power of advanced artificial intelligence to reshape the way we engage with written and spoken word, ensuring that everyone, regardless of their literacy levels or learning styles, can fully participate in the workplace.</p>
            </div>
            <br></br>
            <div className='tools'>
                <h2>Our Tools</h2>
                <h4>A collection of tools informed by the needs of neurodiverse users</h4>
                <div class="flip-container">
                    <Link to="/writer-audio"><div class="flip-card">
                        <div class="flip-card-front">
                            <img src='https://static.thenounproject.com/attribution/6219314-600.png' width={'80px'}></img>
                            <p>Audio <br></br>Writer</p>
                        </div>
                        <div class="flip-card-back">
                            <p>Turn your voice into text</p>
                        </div>
                    </div></Link>
                    <Link to="/audio-transcript"><div class="flip-card">
                        <div class="flip-card-front">
                            <img src='https://static.thenounproject.com/attribution/5843340-600.png' width={'80px'}></img>
                            <p>Audio <br></br>Transcript</p>
                        </div>
                        <div class="flip-card-back">
                            <p>Turn audio into text</p>
                        </div>
                    </div></Link>
                    <Link to="/writer-text"><div class="flip-card">
                        <div class="flip-card-front">
                            <img src='https://static.thenounproject.com/attribution/6189942-600.png' width={'80px'}></img>
                            <p>Text <br></br>Writer</p>
                        </div>
                        <div class="flip-card-back">
                            <p>Upgrade your text</p>
                        </div>
                    </div></Link>
                    <Link to="/reader-audio"><div class="flip-card">
                        <div class="flip-card-front">
                            <img src='https://static.thenounproject.com/attribution/6214204-600.png' width={'80px'}></img>
                            <p>Audio <br></br>Reader</p>
                        </div>
                        <div class="flip-card-back">
                            <p>Listen to your text</p>
                        </div>
                    </div></Link>
                    <Link to="/reader-text"><div class="flip-card">
                        <div class="flip-card-front">
                            <img src='https://static.thenounproject.com/attribution/3322753-600.png' width={'80px'}></img>
                            <p>Reader <br></br>Text</p>
                        </div>
                        <div class="flip-card-back">
                            <p>Make reading easier</p>
                        </div>
                    </div></Link>
                </div>


            </div>
        </div>
        
    )
}

export default Home;