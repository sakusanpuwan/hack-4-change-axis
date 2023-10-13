import { useState } from "react";
import {textVide} from "text-vide";
import ReactHtmlParser from 'react-html-parser';
import './Reader.css';

const Reader = () => {

    const [inputText, setInputText] = useState([]);
    const [outputText, setOutputText] = useState([]);
    const [fixationPoint, setFixationPoint] = useState([]);


    const handleChange = (event) => {
        setInputText(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const bionic = textVide(inputText);
        setOutputText(bionic);
    }

    const handleFixation= (event) => {
        setFixationPoint(event.target.value)
        const bionic = textVide(inputText, {fixationPoint: fixationPoint});
        setOutputText(bionic);
    }
    
    console.log(textVide(inputText))

    return (
        <div>
            <h1>Reader</h1>
            <div className="input-text">
                <form onSubmit={handleSubmit}>
                    <textarea type="text" id="inputTextBox" value={inputText} onChange={handleChange}/>
                    <button id="textFormatButton">Generate!</button>
                </form>
            </div>
            <div className="bionic-section">
                <h2>BIONIC Output</h2>
                <p>Change fixation point:</p>
                <input type="range" id="fixationPoint" min="1" max="5" value={fixationPoint} onChange={handleFixation}/>
            </div>        

            <p id="outputText">{ReactHtmlParser(outputText)}</p>
        </div>
    )
}

export default Reader;

// TEMPLATE TEXT
// It is imperative to recognise the significance of acknowledging neurodiversity in the workplace. This entails acknowledging and accommodating individuals with neurological differences, such as autism, ADHD, and dyslexia, among others. By embracing neurodiversity, organisations can foster a more inclusive and diverse work environment, which can lead to increased productivity, creativity, and innovation.