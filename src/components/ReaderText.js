import { useState } from "react";
import fetchGPTResponse from "../services/FetchGPTResponse";
import { PropagateLoader } from "react-spinners";

const ReaderText = () => {

    const [prompt,setPrompt] = useState("");
    const [response,setResponse] = useState();
    const [isLoading,setIsLoading] = useState()

    const handleClick = async () => {
        setIsLoading(true)
        const response = await fetchGPTResponse(prompt);
        setResponse(response);
        setIsLoading(false)
    } 


    return (
        <div className="reader-text-container">
            <h1>ReaderText</h1>
            <form>
                <textarea rows={6} cols={50} onChange={(event) => setPrompt(event.target.value)} placeholder="Enter text here..."></textarea>
                <br></br>
                <button onClick={() => {handleClick()}} value="submit">Submit</button>    
            </form>
            <br></br>
            {isLoading === true ? <PropagateLoader color="white"/> :<p>{response}</p> }

        </div>
        
    )
}

export default ReaderText;