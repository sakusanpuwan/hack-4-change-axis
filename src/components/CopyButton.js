import React, { useState } from 'react'
import '../App.css'

const CopyButton = ({text}) => {
    const [copiedMessage, setCopiedMessage] = useState("");
    
    const handleCopyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
   
    setCopiedMessage("Copied!");
  
    setTimeout(() => {
      setCopiedMessage("");
    }, 3000); 
    };

    return (
        <div>
            {copiedMessage && <p className="copied-message">{copiedMessage}</p>}
            <button className="copied-button" onClick={handleCopyToClipboard}>Copy</button>
        </div>
        
    )
}

export default CopyButton