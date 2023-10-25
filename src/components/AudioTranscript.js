import "../styling/AudioTranscript.css"
import React, { useRef, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Circle } from 'rc-progress';
import CopyButton from "./CopyButton";
import ReadingRuler from "./ReadingRuler";
import { TypeAnimation } from "react-type-animation";
import SaveButton from "./SaveButton";


const REACT_APP_KEY = process.env.REACT_APP_KEY;
const model = "whisper-1";

const AudioTranscript = () => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [response, setResponse] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [transcribedText, setTranscribedText] = useState('');

  const onFileChange = () => {
    const selectedFile = inputRef.current.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsFileUploaded(true);
    }
  };

  const splitAndTranscribe = useCallback((file) => {
    setIsLoading(true);
    const chunkSize = 25000000; // 25MB
    const fileSize = file.size;

    if (fileSize <= chunkSize) {
      // If the file size is smaller than or equal to 25MB, transcribe it directly
      transcribeAudioFile(file);
    } else {
      // If the file size is greater than 25MB, split it into segments and transcribe each segment
      const numberOfSegments = Math.ceil(fileSize / chunkSize);
      const segments = [];

      for (let i = 0; i < numberOfSegments; i++) {
        const start = i * chunkSize;
        const end = Math.min((i + 1) * chunkSize, fileSize);
        const chunk = file.slice(start, end);
        segments.push(chunk);
      }

      const promises = segments.map((segment, index) => {
        const formData = new FormData();
        formData.append("model", model);
        formData.append("file", segment);
        return axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${REACT_APP_KEY}`,
          }
        });
      });

      Promise.all(promises)
        .then((responses) => {
          const transcriptions = responses.map((res) => res.data.transcription);
          const combinedTranscription = transcriptions.join(" "); // Combine transcriptions
          setResponse({ transcription: combinedTranscription });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
            setIsLoading(false); // Set isLoading to false when transcription is complete
            setLoadingProgress(100);
        });
    }
  }, []);

  const transcribeAudioFile = (file) => {
    const formData = new FormData();
    formData.append("model", model);
    formData.append("file", file);

    axios
      .post("https://api.openai.com/v1/audio/transcriptions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${REACT_APP_KEY}`,
        }
      })
      .then((res) => {
        console.log(res.data);
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); 
        setLoadingProgress(100);
    });
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    splitAndTranscribe(file);
  }, [file, splitAndTranscribe]);

  useEffect(() => {
    if (response && response.text) {
      setTranscribedText(response.text);
    }
  }, [response]);

  return (
    <div className="audio-transcript-container">
      <div className='info'>
          <h1>Audio Transcript</h1>
          <TypeAnimation 
                    sequence={[
                        `Turn audio into text`,
                        500,
                    ]}
                    style={{ fontSize: 'medium' , width:'250px'}}
                    repeat={Infinity}
          />
      </div>
      <br></br>
      <div className="left-box">
        <input type="file" ref={inputRef} accept="audio/*" onChange={onFileChange} />
        {isFileUploaded && !response && (
          <div>
            <p>File uploaded</p>
            {isLoading ? (
              <div className="loading-container">
                <p>Transcribing...</p>
                <div className="loading-bar">
                  <Circle percent={loadingProgress} strokeWidth={6} strokeColor="#1890ff" />
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>  
      <div className="right-box">
        {transcribedText ? (
          <div className="transcription-box">
            <h3>Transcribed Text:</h3>
            <div className="transcription-text">{transcribedText}</div>
          </div>
        ) : (
          <div className="transcription-box">
            <h3>Transcribed Text:</h3>
            <p>Upload a file to transcribe...</p>
          </div>
        )}
      </div>
      {transcribedText && !isLoading && (
          <div className="button-and-ruler">
              <CopyButton text={transcribedText} />
              <SaveButton response={transcribedText}/>
              <ReadingRuler/>
          </div>
        )}
     </div>
  );
  
};


export default AudioTranscript;