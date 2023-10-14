import { useState } from "react";
import fetchGPTResponse from "../services/FetchGPTResponse";
import { PropagateLoader } from "react-spinners";
import ReactHtmlParser from 'react-html-parser';

const ReaderText = () => {

    const [prompt,setPrompt] = useState("");
    const [response,setResponse] = useState();
    const [isLoading,setIsLoading] = useState()

    // const handleClick = async () => {
    //     setIsLoading(true)
    //     const response = await fetchGPTResponse(prompt);
    //     setResponse(response);
    //     setIsLoading(false)
    // } 

    const[inputText, setInputText] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [textWithKeywords, setTextWithKeywords] = useState([]);

    // have some kind of handling, eg please try again, if GPT response was not as expected
    // sometimes doesn't pick up on the prompt and returns nonsense - need to click generate again
    // normally happens after longer time waiting for response - consider timing out the request earlier and prompt user to try again 
    // if GPT response contains "I'm sorry" - prompt user to try again

    // sometimes still returns keywords separated by numbers - need logic to handle that
    async function getKeywords() {
        const keywordsPrompt = "find 10 single-word keywords (nouns or verbs) from the text bellow, return keywords exactly how they were in the text, separated by comma::\n\n" + inputText; 
        setPrompt(keywordsPrompt);
        setIsLoading(true);
        const response = await fetchGPTResponse(prompt); 
        const keywordsSplit = response.split(", "); // need logic to split if keywords returned are numbered
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
        const inputSingleWords = inputText.split(" ");
        for (let i = 0; i < inputSingleWords.length; i++) { 
            // sometimes partial matches get highlighted - eg IN from infrastructure
            if (keywords.find(keyword => inputSingleWords[i].includes(keyword))) {
                inputSingleWords[i] = inputSingleWords[i].toUpperCase();
            }  
        }         
        setTextWithKeywords(inputSingleWords.join(" ")); 
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
        setTextWithKeywords(inputSingleWords.join(" "));    
    };
        
    return (
        <div className="reader-text-container">
            <h1>ReaderText</h1>
            <form>
                <textarea rows={6} cols={50} onChange={(event) => setInputText(event.target.value)} placeholder="Enter text here..."></textarea>
                <br></br>
                <button onClick={handleKeywords} value="submit">Generate Keywords</button>  
                <button onClick={handleUppercaseKeywords} value="submit">Uppercase Keywords</button>  
                <button onClick={handleBoldKeywords} value="submit">Bold Keywords</button>  
            </form>
            <br></br>
            {isLoading === true ? <PropagateLoader color="white"/> :<p>{response}</p> }
            <p>{ReactHtmlParser(textWithKeywords)}</p>
        </div>
    )
}

export default ReaderText;

// TEMPLATE TEXT
// It is imperative to recognise the significance of acknowledging neurodiversity in the workplace. This entails acknowledging and accommodating individuals with neurological differences, such as autism, ADHD, and dyslexia, among others. By embracing neurodiversity, organisations can foster a more inclusive and diverse work environment, which can lead to increased productivity, creativity, and innovation.

