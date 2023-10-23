import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

const Export = () => {
  const [transcript, setTranscript] = useState(null);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);

  const startRecording = async () => {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const mediaRecorder = new MediaRecorder(audioStream);
          mediaRecorderRef.current = mediaRecorder;
          audioStreamRef.current = audioStream;
    
          const recordedChunks = [];
    
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              recordedChunks.push(e.data);
            }
          };
    
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            setTranscript(url);
          };
    
          mediaRecorder.start();
          setRecording(true);
        } catch (error) {
          console.error('Error starting recording:', error);
        
      };
    
  };

  const stopRecording = () => {
        const mediaRecorder = mediaRecorderRef.current;
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          audioStreamRef.current.getTracks().forEach((track) => track.stop());
          setRecording(false);
      };
  };

  const exportTranscript = () => {
    if (transcript) {
      // Export as PDF
      const createPDF = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        page.drawText(transcript, {
          x: 50,
          y: 350,
          size: 12,
          color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'transcript.pdf');
      };

      // Export as text
      const createText = () => {
        const blob = new Blob([transcript], { type: 'text/plain' });
        saveAs(blob, 'transcript.txt');
      };

      // Export as doc
      const createDoc = () => {
        const blob = new Blob([transcript], { type: 'application/msword' });
        saveAs(blob, 'transcript.doc');
      };

      createPDF();
      createText();
      createDoc();
    }
  };

  return (
    <div>
      <h2>Transcript</h2>
      {recording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {transcript && (
        <div>
          <audio controls src={transcript}></audio>
          <button onClick={exportTranscript}>Export Transcript</button>
        </div>
      )}

      <div>
        <h1>Transcript</h1>
        {showSubtitles && <div className="subtitles">{transcript}</div>}
        <Button variant="outlined" onClick={exportTranscript}>
          Export Transcript
        </Button>
        <Button variant="outlined" onClick={() => setShowSubtitles(!showSubtitles)}>
          {showSubtitles ? 'Hide Subtitles' : 'Show Subtitles'}
        </Button>
      </div>
    </div>
  );
};

export default Export;