import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import CopyButton from './CopyButton';

const WriterAudio = () => {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
    }
    
    return (
    <div>
        <h1>WriterAudio</h1>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={() => {SpeechRecognition.startListening({continuous:true})}}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        <br></br>
        {transcript && <CopyButton text={transcript}/>}
    </div>
    );
}

export default WriterAudio;