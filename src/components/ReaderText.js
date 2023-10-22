import '../styling/ReaderText.css'
import '../styling/ReadingRuler.css'
import { useState } from "react";
import fetchGPTResponse from "../services/FetchGPTResponse";
import { PropagateLoader } from "react-spinners";
import ReadFormatOptions from "./ReadFormatOptions";
import {textVide} from "text-vide";
import ReactHtmlParser from 'react-html-parser';
import SaveButton from './SaveButton';
import Draggable from 'react-draggable';
import CopyButton from './CopyButton';
import ReadingRuler from './ReadingRuler';


const ReaderText = () => {

    const [prompt,setPrompt] = useState(""); // Prompt to be sent to API
    const [input,setInput] = useState("");  // User Input
    const [response,setResponse] = useState();  // Response from API
    const [isLoading,setIsLoading] = useState() // Are we waiting/loading for a response?
    const [keywords, setKeywords] = useState([]);
    const [fixationPoint, setFixationPoint] = useState(2);
    const [colour, setColour] = useState("#FAEBD7");
    const [language, setLanguage] = useState("");

    const handleSyllableSpacing = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const updatedPrompt = `add hyphens between each syllables in each word in the following text:${input}`;
        setPrompt(prompt);
        const response = await fetchGPTResponse(updatedPrompt);
        setResponse(response);
        setIsLoading(false);
        setPrompt("");
    }

    const handleSummarise = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const updatedPrompt = `summarise as simply as possible the following text:${input}`;
        setPrompt(prompt);
        const response = await fetchGPTResponse(updatedPrompt);
        setResponse(response);
        setIsLoading(false);
        setPrompt("");
    }

    const handleTranslate = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const updatedPrompt = `translate into ${language} the following text:${input}`;
        setPrompt(prompt);
        const response = await fetchGPTResponse(updatedPrompt);
        setResponse(response);
        setIsLoading(false);
        setPrompt("");
    }

    async function getKeywords() {
        const keywordsPrompt = "find 10 single-word keywords (nouns or verbs) from the text bellow, return keywords exactly how they were in the text, separated by comma::\n\n" + input; 
        setIsLoading(true);
        const response = await fetchGPTResponse(keywordsPrompt);     
        const keywordsSplit = response.split(", "); // need logic to split if keywords returned are numbered / separated differently
        setKeywords(keywordsSplit); 
        setResponse(response);
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
        const inputSingleWords = input.split(" ");
        for (let i = 0; i < inputSingleWords.length; i++) { 
            // sometimes partial matches get highlighted - eg IN from infrastructure
            if (keywords.find(keyword => inputSingleWords[i].includes(keyword))) {
                inputSingleWords[i] = inputSingleWords[i].toUpperCase();
            }  
        }         
        setResponse(inputSingleWords.join(" "));  
    };

    // bolds keyword exactly how input text was split into an array - ie including with punctuation    
    const handleBoldKeywords = async () => {
        // reenable after unexpected AI responses are handled for - otherwise keyword search gets impaired
        // if (!keywords.length) {
        //     getKeywords();
        // }
        const inputSingleWords = input.split(" ");
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
        setResponse(inputSingleWords.join(" "));    
    };

    const handleBionic = (event) => {
        event.preventDefault();
        const bionic = textVide(input);
        setResponse(bionic);
    }

    const handleFixation= (event) => {
        setFixationPoint(event.target.value)
        const bionic = textVide(input, {fixationPoint: fixationPoint});
        setResponse(bionic);
    }


    return (
        <div className="reader-text-container">
            <h1>ReaderText</h1>
            <br></br>
            <div className='reader-text-input'>
                <form>
                    <textarea rows={10} cols={80} onChange={(event) => setInput(event.target.value)} placeholder="Enter text here..."></textarea>
                    <br></br>
                </form>
            </div>
            <div className="text-format-section">
                <div className="button-section">
                    <button onClick={handleKeywords} value="submit">Generate Keywords</button>  
                    <button onClick={handleUppercaseKeywords} value="submit">Uppercase Keywords</button>  
                    <button onClick={handleBoldKeywords} value="submit">Bold Keywords</button> 
                    <button onClick={handleSyllableSpacing} value="submit">Space Syllables</button>
                    <button onClick={handleSummarise} value="submit">Summarise</button>
                    <div>
                        <select onChange={(e) => {setLanguage(e.target.value)}}>
                            <option value="English">Select a Language</option>
                            <option value="German">German</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                        </select>
                        <button onClick={handleTranslate} value="submit">Translate</button>
                    </div>

                </div> 
                <div className="bionic-section">
                    <p>Change Bionic fixation point:</p>
                    <input type="range" id="fixationPoint" min="1" max="5" value={fixationPoint} onChange={handleFixation}/>
                    <button id="bionicButton" onClick={handleBionic}>Generate Bionic</button>
                </div>   
                <input type="color" value={colour} onChange={(e) => {setColour(e.target.value)}}></input>
                <label>Choose colour</label>
            </div>
            <br></br>
            <div className='output'>
                {isLoading === true ? 
                    <PropagateLoader color="white" id="loader"/> 
                : 
                    <div>
                        {response && (
                            <div>
                            <p className='output-text' style={{color:colour}}>{ReactHtmlParser(response)}</p>
                            <SaveButton response={response}/>
                            <CopyButton text={response}/>
                            <ReadingRuler/>
                            </div>
                        )}
                    </div>
                }
            </div>


        </div>
    )
}

export default ReaderText;

