import { useState } from "react";
import fetchGPTResponse from "../services/FetchGPTResponse";
import { PropagateLoader } from "react-spinners";
import SaveButton from "./SaveButton";
import ReactHtmlParser from 'react-html-parser';


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
        <div>
            <h1>WriterText</h1>
            <form>
                <textarea rows={10} cols={80} onChange={(event) => setInput(event.target.value)} placeholder="Enter text here..."></textarea>
                <button value="spell check" onClick={(e) => {handleClick(e)}}>Spell Check</button>
                <button value="improve" onClick={(e) => {handleClick(e)}}>Improve</button>
            </form>
            <br></br>
            {isLoading === true ? 
                <PropagateLoader color="white" id="loader"/> 
            : 
                <div>
                    <p className='output-text' >{ReactHtmlParser(response)}</p>
                    {response && <SaveButton response={response}/>}
                </div>
            }
        </div>
    )
}

export default WriterText;