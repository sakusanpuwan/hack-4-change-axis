import { useState } from "react";
import fetchGPTResponse from "../services/FetchGPTResponse";
import { PropagateLoader } from "react-spinners";
import ReadFormatOptions from "./ReadFormatOptions";

const ReaderText = () => {

    const [prompt,setPrompt] = useState("");
    const [input,setInput] = useState("");
    const [response,setResponse] = useState();
    const [isLoading,setIsLoading] = useState()

    const handleClick = async () => {
        setIsLoading(true)
        setPrompt((prevPrompt) => `${prevPrompt} .The text is:${input}`)
        const response = await fetchGPTResponse(prompt);
        setResponse(response);
        setTimeout(async () => {
            const response = await fetchGPTResponse(prompt);
            setResponse(response);
          }, 1000);
        setIsLoading(false);
        // setPrompt("");
    } 

    const updatePrompt = (formatter) => {
        setPrompt((prevPrompt) => prevPrompt + ","+ formatter)
    }


    return (
        <div className="reader-text-container">
            <h1>ReaderText</h1>
            <form>
                <textarea rows={6} cols={50} onChange={(event) => setInput(event.target.value)} placeholder="Enter text here..."></textarea>
                <br></br>
                <button onClick={() => {handleClick()}} value="submit">Submit</button>    
            </form>
            <ReadFormatOptions updatePrompt = {updatePrompt}/>
            <br></br>
            {isLoading === true ? <PropagateLoader color="white"/> :<p>{response}</p> }

        </div>
        
    )
}

export default ReaderText;

