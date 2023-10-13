import React, { useState } from 'react'

const ReadFormatOptions = ({updatePrompt}) => {

    const [syllableSpacing, setSyllableSpacing] = useState(false);
    const [bolding, setBolding] = useState(false);
    const [translations, setTranslations] = useState(false);
    const [summarise, setSummarise] = useState(false);

    
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
            value="make the text easier to read by adding hyphens between syllables"
            onChange={(e) => handleOptionChange(setSyllableSpacing,e.target.value)}
            />
            Syllable Spacing
            </label>
            <label>
            <input
            type="checkbox"
            checked={bolding}
            value="capitalise the first word of each new sentence in the text"
            onChange={(e) => handleOptionChange(setBolding,e.target.value)}
            />
            Bolding
            </label>
            <label>
            <input
            type="checkbox"
            checked={translations}
            value="translate the text into German"
            onChange={(e) => handleOptionChange(setTranslations,e.target.value)}
            />
            Translations
            </label>
            <label>
            <input
            type="checkbox"
            checked={summarise}
            value="summarise the text"
            onChange={(e) => handleOptionChange(setSummarise,e.target.value)}
            />
            Summarise
            </label>
        </div>
  )
}

export default ReadFormatOptions;

