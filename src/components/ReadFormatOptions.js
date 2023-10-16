import '../styling/ReaderText.css'
import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react'

const ReadFormatOptions = ({updatePrompt}) => {

    const [syllableSpacing, setSyllableSpacing] = useState(false);
    const [translations, setTranslations] = useState(false);
    const [summarise, setSummarise] = useState(false);
    const [language, setLanguage] = useState("");

    const languages = [
        {label:"English"},
        {label:"German"},
        {label:"Spanish"},
        {label:"French"}
    ]

    
    const handleOptionChange = (setState,value) => {
        setState((prevState) => !prevState);
        updatePrompt(value)
    };

    return (
        <div className='read-format-options'>
            <label>
            <input
            type="checkbox"
            checked={syllableSpacing}
            value="add hyphens between syllables in each word in text"
            onChange={(e) => handleOptionChange(setSyllableSpacing,e.target.value)}
            />
            Syllable Spacing
            </label>
            <label>
            <input
            type="checkbox"
            checked={summarise}
            value="summarise the text as simply as possible"
            onChange={(e) => handleOptionChange(setSummarise,e.target.value)}
            />
            Summarise
            </label>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{height:50,width:150,backgroundColor: 'white',borderRadius:5}}
                options={languages}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Languages" placeholder="Choose language"/>}
                onChange={(event, chosenValue) => {setLanguage(chosenValue.label)}}
            />
            <label>
            <input
            type="checkbox"
            checked={translations}
            value={`translate the text into ${language}`}
            onChange={(e) => handleOptionChange(setTranslations,e.target.value)}
            />
            Translate
            </label>
        </div>
  )
}

export default ReadFormatOptions;

