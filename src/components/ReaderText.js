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


const ReaderText = () => {

    const [prompt,setPrompt] = useState(""); // Prompt to be sent to API
    const [input,setInput] = useState("");  // User Input
    const [response,setResponse] = useState();  // Response from API
    const [isLoading,setIsLoading] = useState() // Are we waiting/loading for a response?
    const [keywords, setKeywords] = useState([]);
    const [fixationPoint, setFixationPoint] = useState(2);
    const [colour, setColour] = useState("#FAEBD7");

    const handleClick = async () => {
        setIsLoading(true)
        const updatedPrompt = `The text to manipulate will be enclosed within arrow brackets (<>). Do the following manipulations to the text ${prompt}. The text to manipulate is <${input}>`;
        console.log(updatedPrompt);
        setPrompt(updatedPrompt);
        const response = await fetchGPTResponse(updatedPrompt);
        setResponse(response);
        setIsLoading(false);
        setPrompt("");
    } 

    // Chains formats from ReadFormatOptions
    const updatePrompt = (formatter) => {
        setPrompt((prevPrompt) => prevPrompt + ","+ formatter)
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
                <div>
                    <ReadFormatOptions updatePrompt = {updatePrompt}/>
                </div>
            </div>
            <div className="text-format-section">
                <div className="button-section">
                    <button onClick={handleKeywords} value="submit">Generate Keywords</button>  
                    <button onClick={handleUppercaseKeywords} value="submit">Uppercase Keywords</button>  
                    <button onClick={handleBoldKeywords} value="submit">Bold Keywords</button> 
                    <button onClick={handleClick} value="submit">Submit</button>
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
            {isLoading === true ? 
                <PropagateLoader color="white" id="loader"/> 
            : 
                <div>
                    <p className='output-text' style={{color:colour}}>{ReactHtmlParser(response)}</p>
                    {response && <SaveButton response={response}/>}
                </div>
            }
            <br></br>
            <Draggable>
                <div className='reading-ruler'>
                </div>
            </Draggable>
            
        </div>
    )
}

export default ReaderText;

