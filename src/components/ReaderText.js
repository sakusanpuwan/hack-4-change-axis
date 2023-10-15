import { useState } from "react";
import fetchGPTResponse from "../services/FetchGPTResponse";
import { PropagateLoader } from "react-spinners";
import ReactHtmlParser from 'react-html-parser';
import {textVide} from "text-vide";
import './ReaderText.css';

const ReaderText = () => {

    const [prompt,setPrompt] = useState("");
    // const [response,setResponse] = useState();
    const [isLoading,setIsLoading] = useState()

    // const handleClick = async () => {
    //     setIsLoading(true)
    //     const response = await fetchGPTResponse(prompt);
    //     setResponse(response);
    //     setIsLoading(false)
    // } 

    const[inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState([]);

    const [keywords, setKeywords] = useState([]);
    const [textWithKeywords, setTextWithKeywords] = useState([]);

    const [fixationPoint, setFixationPoint] = useState(2);

    const textToSpeech = new SpeechSynthesisUtterance(inputText);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);

    // have some kind of handling, eg please try again, if GPT response was not as expected
    // sometimes doesn't pick up on the prompt and returns nonsense - need to click generate again
    // normally happens after longer time waiting for response - consider timing out the request earlier and prompt user to try again 
    // if GPT response contains "I'm sorry" - prompt user to try again

    // sometimes still returns keywords separated by numbers - need logic to handle
    // 1. firstKeyword 2. secondKeyword
    // sometimes returns keywords unrelated to text - add check if input text matches all keywords

    async function getKeywords() {
        const keywordsPrompt = "find 10 single-word keywords (nouns or verbs) from the text bellow, return keywords exactly how they were in the text, separated by comma::\n\n" + inputText; 
        setPrompt(keywordsPrompt);
        setIsLoading(true);
        const response = await fetchGPTResponse(prompt); 
        const keywordsSplit = response.split(", "); // need logic to split if keywords returned are numbered
        setKeywords(keywordsSplit);
        setOutputText(response);
        setIsLoading(false);
    }
    
    // adding a getKeywords() function to all keyword handler methods
    // otherwise, uppercase & bold handlers will work only after keywords have been identified first
    const handleKeywords = async (event) => {
        event.preventDefault();
        getKeywords();    
    } 

    const handleUppercaseKeywords = async () => {
        // reenable after unexpected AI responses are handled for - otherwise keyword search gets impaired
        // if (!keywords.length) {
        //     getKeywords();
        // }
        const inputSingleWords = inputText.split(" ");
        for (let i = 0; i < inputSingleWords.length; i++) { 
            // sometimes partial matches get highlighted - eg IN from infrastructure
            if (keywords.find(keyword => inputSingleWords[i].includes(keyword))) {
                inputSingleWords[i] = inputSingleWords[i].toUpperCase();
            }  
        }         
        setOutputText(inputSingleWords.join(" "));  
    };

    // bolds keyword exactly how input text was split into an array - ie including with punctuation    
    const handleBoldKeywords = async () => {
        // reenable after unexpected AI responses are handled for - otherwise keyword search gets impaired
        // if (!keywords.length) {
        //     getKeywords();
        // }
        const inputSingleWords = inputText.split(" ");
        for (let i = 0; i < inputSingleWords.length; i++) { 
            if (keywords.find(keyword => inputSingleWords[i].includes(keyword))) {
                // needs more logic to handle not bolding other punctuation marks
                if (inputSingleWords[i].includes(",")) {
                    const punctSplit = inputSingleWords[i].split(",");
                    punctSplit[0] = "<b>" + punctSplit[0] + "</b>";
                    punctSplit.join("");
                    inputSingleWords[i] = punctSplit;
                } else {
                    inputSingleWords[i] = "<b>" + inputSingleWords[i] + "</b>"; 
                }
            }  
        }       
        setOutputText(inputSingleWords.join(" "));    
    };

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
        window.speechSynthesis.cancel();
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
        window.speechSynthesis.resume(textToSpeech);
    }

    return (
        <div className="reader-text-container">
            <h1>ReaderText</h1>
            <form className="whole-thing">
                <div className="input-output">
                    <textarea id="inputTextBox" rows={6} cols={50} onChange={(event) => setInputText(event.target.value)} placeholder="Enter text here..."></textarea>
                    <br></br> 
                    {/* output text doesn't have linebreaks even though in state shows \n */}
                    {isLoading === true ? <PropagateLoader color="white" id="loader"/> : <p id="outputText">{ReactHtmlParser(outputText)}</p>}
                </div>
                <div className="text-format-section">
                    <div className="keywords-section">
                        <button id="generateKeywordsButton" onClick={handleKeywords} value="submit">Generate Keywords</button>  
                        <button id="uppercaseKeywordsButton"onClick={handleUppercaseKeywords} value="submit">Uppercase Keywords</button>  
                        <button id="boldKeywordsButton" onClick={handleBoldKeywords} value="submit">Bold Keywords</button> 
                    </div> 
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
    )
}

export default ReaderText;

// TEMPLATE TEXT
// It is imperative to recognise the significance of acknowledging neurodiversity in the workplace. This entails acknowledging and accommodating individuals with neurological differences, such as autism, ADHD, and dyslexia, among others. By embracing neurodiversity, organisations can foster a more inclusive and diverse work environment, which can lead to increased productivity, creativity, and innovation.

