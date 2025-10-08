import React, { useState, useRef } from "react";

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [data,setData] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
	



      const formData = new FormData();
        formData.append("audio", audioBlob, "audio.mp3");
        setData(formData);








        audioChunks.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Erreur d’accès au micro :", err);
      alert("Impossible d'accéder au microphone.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🎤 Enregistreur vocal</h2>
      {!recording ? (
        <button onClick={startRecording}>Démarrer l'enregistrement</button>
      ) : (
        <button onClick={stopRecording}>Arrêter</button>
      )}
      {audioURL && (
        <div style={{ marginTop: "20px" }}>
          <h4>🔊 Lecture du message :</h4>
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
}
