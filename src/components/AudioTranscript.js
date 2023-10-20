import React, { useRef, useEffect, useState, useCallback } from "react";
import axios from "axios";

const REACT_APP_KEY = process.env.REACT_APP_KEY;
const model = "whisper-1";

const AudioTranscript = () => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [response, setResponse] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

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
    });
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    splitAndTranscribe(file);
  }, [file, splitAndTranscribe]);

  return (
    <div className="audio-transcript-container">
      <h1>Audio Transcript</h1>
      <p>Transcribe audio recordings</p>
      <input type="file" ref={inputRef} accept="audio/*" onChange={onFileChange} />
      
      {isFileUploaded && !response ? (
        <div>
          <p>File uploaded</p>
          {isLoading ? (
            <div className="loading-bar">Transcribing...</div>
          ) : null}
        </div>
      ) : null}
  
      {response && response.text && !isLoading && (
        <div>{JSON.stringify(response.text, null, 2)}</div>
      )}
    </div>
  );
 
};

export default AudioTranscript;
