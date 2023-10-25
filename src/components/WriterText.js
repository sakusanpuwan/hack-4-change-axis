import { useState } from "react";
import fetchGPTResponse from "../services/FetchGPTResponse";
import { PropagateLoader } from "react-spinners";
import SaveButton from "./SaveButton";
import ReactHtmlParser from 'react-html-parser';
import '../styling/WriterText.css'
import CopyButton from "./CopyButton";
import ReadingRuler from "./ReadingRuler";


const WriterText = () => {


    const [input,setInput] = useState("");  // User Input
    const [response,setResponse] = useState();  // Response from API
    const [isLoading,setIsLoading] = useState() // Are we waiting/loading for a response?

    const handleClick = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        const prompt = `${event.target.value} and return the following text edited only: ${input}.`;
        const response = await fetchGPTResponse(prompt);
        setResponse(response);
        setIsLoading(false);
    } 

    return (
        <div className="writer-text-container">

        <br></br>
        <div className='info'>
            <h1>Writer Text</h1>
            <p>Upgrade your text</p>
        </div>
        <br></br>

            <form>
                <textarea rows={10} cols={80} onChange={(event) => setInput(event.target.value)} placeholder="Enter text here..."></textarea>
                <div className="button-section">
                <button value="spell check" onClick={(e) => {handleClick(e)}}>Spell Check ✔️</button>
                <button value="improve text suitable for work related purposes" onClick={(e) => {handleClick(e)}}>Improve 👍🏽</button>
                <button value="remove negatively charged words,rewrite positively suitable for work communication" onClick={(e) => {handleClick(e)}}>Sentiment 🙂</button>
                </div>
            </form>
            <br></br>
            {isLoading === true ? 
                <PropagateLoader color="white" id="loader"/> 
            : 
                <div>
                    <p className='output-text' >{ReactHtmlParser(response)}</p>
                    {response && <SaveButton response={response}/>}
                    {response && <CopyButton text={response}/>}
                    {response && <ReadingRuler/>}
                </div>
            }
        </div>
    )
}

export default WriterText;