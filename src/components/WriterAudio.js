import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import CopyButton from './CopyButton';
import '../styling/ReaderText.css'
import ReadingRuler from './ReadingRuler';


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

    // Export as PDF
        // consider adding - font, font size, colour params as chosen by the user
    const exportPDF = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage(); 
            // consider adding multiple pages dynamically as text size increases
        const {width, height} = page.getSize();
        const timesNewRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        page.drawText(transcript, {
            x: 50,
            y: height - 5 * 10, // page height - 5 * font size
            size: 10,
            color: rgb(0, 0, 0),
            maxWidth: width - 100, // to allow text to wrap
            lineHeight: 20,
            font: timesNewRoman
        });
        const pdfBytes = await pdfDoc.save(); // into an array of bytes making up a PDF file
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'transcribedText.pdf');
    };
    
    return (
    <div>
        <h1>WriterAudio</h1>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={() => {SpeechRecognition.startListening({continuous:true})}}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <div className='output-text'>
            <p>{transcript}</p>
        </div>
        <br></br>
        {transcript && <CopyButton text={transcript}/>}
        {transcript && <ReadingRuler/>}
        {transcript && <button id="pdfButton" onClick={exportPDF}>Export PDF</button>}
    </div>
    );
}

export default WriterAudio;