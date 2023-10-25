import React, { useState } from 'react'
import '../styling/ReadingRuler.css'
import Draggable from 'react-draggable';

const ReadingRuler = () => {

    const [ruler,setRuler] = useState(false);

    return (
        <div>
            <button className='ruler-button' onClick={() => {setRuler(!ruler)}}>Ruler 📏</button>
            {ruler && 
            <Draggable>
                <div className='reading-ruler'>
                </div>
            </Draggable>}
        </div>
    )
}

export default ReadingRuler