

// import React, { useRef, useState } from "react";
// import OpenAI from "openai";

// const model = "whisper-1"

// const openai = new OpenAI({
//   apiKey: `${process.env.REACT_APP_KEY}`,
//   dangerouslyAllowBrowser: true,
// });

// const AudioTranscript = () => {
//   const inputRef = useRef();
//   const [file, setFile] = useState(null);
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const onChangeFile = () => {
//     const selectedFile = inputRef.current.files[0];

//     if (selectedFile) {
//       setFile(selectedFile);
//       console.log("File chosen: ", selectedFile);
//     }
//   };

//   const supportedAudioFormats = [
//     "audio/flac",
//     "audio/x-m4a",
//     "audio/mp3",
//     "audio/mp4",
//     "audio/mpeg",
//     "audio/mpga",
//     "audio/ogg",
//     "audio/oga",
//     "audio/wav",
//     "audio/webm",
//   ];

//   const readAndTranscribeAudio = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
  
//       reader.onload = async (event) => {
//         const fileContent = event.target.result;
//         const audioBlob = new Blob([fileContent], { type: file.type });
  
//         const formData = new FormData();
//         formData.append('file', audioBlob);
//         formData.append('model', model)
  
//         try {
//           const res = await openai.audio.transcriptions.create(formData,{
//             "Content-Type": "multipart/form-data",
//             model: model

//           });
//           resolve(res.text);
//         } catch (err) {
//           reject(err);
//         }
//       };
  
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const splitAndTranscribeAudioInput = async () => {
//     if (!file) {
//       console.error("No audio to transcribe.");
//       return;
//     }
  
//     const validFormat = supportedAudioFormats.includes(file.type);
//     if (!validFormat) {
//       console.error("Unsupported audio format. Supported formats are:", supportedAudioFormats);
//       return;
//     }
  
//     if (file.size <= 25000000) {
//       // If the file is smaller than or equal to 25MB, transcribe it directly
//       try {
//         setLoading(true);
//         const responseText = await readAndTranscribeAudio(file);
//         setResponse({ text: responseText });
//         setLoading(false);
//       } catch (err) {
//         console.error("Error transcribing audio:", err);
//       }
//     } else {
//       // If the file is larger than 25MB, split and transcribe in segments
//       const transcriptArray = [];
//       let offset = 0;
//       const fileSizeLimit = 25000000;
  
//       while (offset < file.size) {
//         const end = Math.min(offset + fileSizeLimit, file.size);
//         const segment = file.slice(offset, end);
  
//         try {
//           const responseText = await readAndTranscribeAudio(segment);
//           transcriptArray.push(responseText);
//         } catch (err) {
//           console.error("Error transcribing segment:", err);
//         }
  
//         offset = end;
//       }
  
//       const fullTranscript = transcriptArray.join(" ");
//       setResponse({ text: fullTranscript });
//     }
//   };
  
  

//   return (
//     <div className="audio-transcript-container">
//       <h1>Audio Transcript</h1>
//       <p>Transcribe audio recordings or use the microphone</p>
//       <input type="file" ref={inputRef} accept="audio/*" onChange={onChangeFile} />
//       <button onClick={splitAndTranscribeAudioInput}>Transcribe</button>
//       {loading ? <p>Loading transcription...</p> : response ? <div>{response.text}</div> : null}
//     </div>
//   );
// };

// export default AudioTranscript;






// import React, {useRef, useEffect, useState} from "react";
// import axios from "axios";

// const REACT_APP_KEY = process.env.REACT_APP_KEY;
// const model = "whisper-1";

// const AudioTranscript = () =>{
//     const inputRef = useRef();
//     const [file, setFile] = useState();
//     const [response,setResponse] = useState(null);

//     const onFileChange = () => {
//         setFile(inputRef.current.files[0]);
//     };

//     useEffect(() => {
//         const fetchAudioFile = async () => {
//             if(!file){
//                 return;
//             }

//             const formData = new FormData();
//             formData.append("model", model);
//             formData.append("file", file);

//             axios.post("https://api.openai.com/v1/audio/transcriptions", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: `Bearer ${REACT_APP_KEY}`,
//                 }
//             })
//             .then((res) => {
//                 console.log(res.data);
//                 setResponse(res.data);
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//         };

//         fetchAudioFile();
//     },[file])

    

//       return (
//     <div className="audio-transcript-container">
//       <h1>Audio Transcript</h1>
//       <p>Transcribe audio recordings or use the microphone</p>
//       <input type="file" ref={inputRef} accept="audio/*" onChange={onFileChange} />
      
//       {response && <div>{JSON.stringify(response, null, 2)}</div> }
//     </div>
//   ); 
// } 
// export default AudioTranscript;

import React, { useRef, useEffect, useState, useCallback } from "react";
import axios from "axios";

const REACT_APP_KEY = process.env.REACT_APP_KEY;
const model = "whisper-1";

const AudioTranscript = () => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [response, setResponse] = useState(null);

  const onFileChange = () => {
    setFile(inputRef.current.files[0]);
  };

  const splitAndTranscribe = useCallback((file) => {
    const chunkSize = 25 * 1024 * 1024; // 25MB
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
      <p>Transcribe audio recordings or use the microphone</p>
      <input type="file" ref={inputRef} accept="audio/*" onChange={onFileChange} />

      {response && <div>{response.transcription}</div>}
    </div>
  );
};

export default AudioTranscript;
