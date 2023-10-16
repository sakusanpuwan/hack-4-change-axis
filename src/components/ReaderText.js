import '../styling/ReaderText.css'

import { useState } from "react";
import fetchGPTResponse from "../services/FetchGPTResponse";
import { PropagateLoader } from "react-spinners";
import ReadFormatOptions from "./ReadFormatOptions";

const ReaderText = () => {

    const [prompt,setPrompt] = useState(""); // Prompt to be sent to API
    const [input,setInput] = useState("");  // User Input
    const [response,setResponse] = useState();  // Response from API
    const [isLoading,setIsLoading] = useState() // Are we waiting/loading for a response?

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


    return (
        <div className="reader-text-container">
            <h1>ReaderText</h1>
            <br></br>
            <div className='reader-text-input'>
                <form>
                    <textarea rows={10} cols={80} onChange={(event) => setInput(event.target.value)} placeholder="Enter text here..."></textarea>
                    <br></br>
                    <button onClick={() => {handleClick()}} value="submit">Submit</button>    
                </form>
                <ReadFormatOptions updatePrompt = {updatePrompt}/>
            </div>
            <br></br>
            {isLoading === true ? <PropagateLoader color="white"/> :<p>{response}</p> }

        </div>
    )
}

export default ReaderText;

