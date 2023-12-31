import { useState } from "react";
import fetchGPTResponse from "../services/FetchGPTResponse";
import '../styling/ReaderAudio.css';
import { Autocomplete, TextField } from "@mui/material";
import { TypeAnimation } from "react-type-animation";


const ReaderAudio = () => {


    const [isLoading,setIsLoading] = useState()

    const[inputText, setInputText] = useState("");

    const textToSpeech = new SpeechSynthesisUtterance(inputText);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    const [languageCode, setLanguageCode] = useState("");

    const languages = [
        {label:"English",key:"en-GB"},
        {label:"German",key:"de-DE"},
        {label:"Spanish",key:"es-ES"},
        {label:"French",key:"fr-FR"}
    ]

    const handleChange = async (language,languageCode) => {
        setIsLoading(true);
        const request = `Translate into ${language} the follwing text: ${inputText}`;
        const response = await fetchGPTResponse(request);
        setInputText(response);
        setLanguageCode(languageCode)
        setIsLoading(false);
    }


    // different accents/languages - if we had translated text
    // const voices = window.speechSynthesis.getVoices(); 
    // textToSpeech.voice=voices[3]; // .lang 

    const handleSpeed = (event) => {
        setPlaybackSpeed(event.target.value)
    }

    // at the moment - speed only changes onClick of "Listen Back" button
    // speed changes only to read the whole text from the beginning
    const handleListen = (event) => {
        event.preventDefault();
        window.speechSynthesis.cancel();
        if (isLoading === true) {
            alert('Please wait and try again')
        } else{
            textToSpeech.rate = playbackSpeed; 
            textToSpeech.lang = languageCode;
            window.speechSynthesis.speak(textToSpeech);
        }

    }

    // on pause should probably be able to change speed 
    const handlePause = (event) => {
        event.preventDefault();
        window.speechSynthesis.pause();
    }

    const handleResume = (event) => {
        event.preventDefault();
        window.speechSynthesis.resume(textToSpeech);
    }

    return (
        <div className="reader-audio-container">
            <br></br>
            <div className='info'>
                <h1>Audio Reader</h1>
                <TypeAnimation
                    sequence={[
                        `Listen to your text`,
                        500,
                    ]}
                    style={{ fontSize: 'medium' , width:'250px'}}
                    repeat={Infinity}
                />
            </div>
            <br></br>
            <form>
                <div className="input-output">
                    <textarea id="inputTextBox" rows={6} cols={50} onChange={(event) => setInputText(event.target.value)} placeholder="Enter text here..."></textarea>
                    <br></br> 
                </div>
                <div className="playback-section">
                    <p>Set playback speed:</p>
                    <input type="range" id="playbackSpeed" min="0.5" max="2" step="0.5" value={playbackSpeed} onChange={handleSpeed}/>
                    <button id="listenButton" onClick={handleListen}>Listen 🎧</button>
                    <button id="pauseButton" onClick={handlePause}>Pause ⏸️</button>
                    <button id="resumeButton" onClick={handleResume}>Resume ▶️ </button>
                    <Autocomplete
                    id="combo-box-demo"
                    sx={{
                        height: 50,
                        width: 150,
                        backgroundColor: 'white',
                        marginLeft: '5px',
                        borderRadius: 3,
                        color: 'black', // Text color
                        '& a': {
                          textDecoration: 'none', // Remove underline from links
                          display: 'inline-block',
                          cursor: 'pointer',
                          boxShadow: 'none',
                          fontWeight: 'bold',
                          fontFamily: 'Roboto Mono, monospace',
                        },
                      }}
                    options={languages}
                    filterSelectedOptions
                    renderInput={(params) => <TextField {...params} label="Languages" placeholder="Choose language" sx={{fontFamily:'Roboto Mono, monospace'}}/>}
                    onChange={(event, chosenValue) => {handleChange(chosenValue.label,chosenValue.key)}}
                    />
                </div>

            </form>
        </div>
    )
}
export default ReaderAudio;

// TEMPLATE TEXT
// It is imperative to recognise the significance of acknowledging neurodiversity in the workplace. This entails acknowledging and accommodating individuals with neurological differences, such as autism, ADHD, and dyslexia, among others. By embracing neurodiversity, organisations can foster a more inclusive and diverse work environment, which can lead to increased productivity, creativity, and innovation.