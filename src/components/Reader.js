import { useState } from "react";
import {textVide} from "text-vide";
import ReactHtmlParser from 'react-html-parser';
import './Reader.css';

const Reader = () => {

    const [inputText, setInputText] = useState([]);
    const [outputText, setOutputText] = useState([]);

    const [fixationPoint, setFixationPoint] = useState(2);

    const textToSpeech = new SpeechSynthesisUtterance(inputText);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);


    const handleChange = (event) => {
        setInputText(event.target.value)
    }

    const handleBionic = (event) => {
        event.preventDefault();
        const bionic = textVide(inputText);
        setOutputText(bionic);
    }

    const handleFixation= (event) => {
        setFixationPoint(event.target.value)
        const bionic = textVide(inputText, {fixationPoint: fixationPoint});
        setOutputText(bionic);
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
        textToSpeech.rate = playbackSpeed; 
        window.speechSynthesis.speak(textToSpeech);
    }

    // on pause should probably be able to change speed 
    const handlePause = (event) => {
        event.preventDefault();
        window.speechSynthesis.pause();
    }

    const handleResume = (event) => {
        event.preventDefault();
        textToSpeech.rate = playbackSpeed;
        window.speechSynthesis.resume(textToSpeech);
    }

    return (
        <div>
            <h1>Reader</h1>
            <div className="input-text">
                <form className="whole-thing">
                    <div className="input-output">
                        <textarea type="text" id="inputTextBox" value={inputText} onChange={(handleChange)}/>
                        <p id="outputText">{ReactHtmlParser(outputText)}</p>
                    </div>
                        <div className="text-format-section">
                            <div className="playback-section">
                                <p>Set playback speed:</p>
                                <input type="range" id="playbackSpeed" min="0.5" max="2" step="0.5" value={playbackSpeed} onChange={handleSpeed}/>
                                <button id="listenButton" onClick={handleListen}>Listen Back</button>
                                <button id="pauseButton" onClick={handlePause}>Pause</button>
                                <button id="resumeButton" onClick={handleResume}>Resume</button>
                            </div>
                            <div className="bionic-section">
                                <p>Change Bionic fixation point:</p>
                                <input type="range" id="fixationPoint" min="1" max="5" value={fixationPoint} onChange={handleFixation}/>
                                <button id="bionicButton" onClick={handleBionic}>Generate Bionic</button>
                            </div>        
                        </div> 
                </form>
            </div>
        </div>
    )
}

export default Reader;

// TEMPLATE TEXT
// It is imperative to recognise the significance of acknowledging neurodiversity in the workplace. This entails acknowledging and accommodating individuals with neurological differences, such as autism, ADHD, and dyslexia, among others. By embracing neurodiversity, organisations can foster a more inclusive and diverse work environment, which can lead to increased productivity, creativity, and innovation.