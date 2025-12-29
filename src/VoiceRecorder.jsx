import { useState, useRef } from "react";

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [data, setData] = useState("");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/mp3" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "audio.mp3");
        setData(formData);

        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

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

  const rec = () => {
    const { VITE_API_HTTP, VITE_API_URL } = import.meta
      .env;

    fetch(
      `${VITE_API_HTTP}://${VITE_API_URL}:3311/audio-record`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.nvName);
      });
    setAudioURL("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🎤 Enregistrement vocal</h2>
      {!recording ? (
        <button onClick={startRecording}>Démarrer l&apos;enregistrement</button>
      ) : (
        <button onClick={stopRecording}>Arrêter</button>
      )}
      {audioURL && (
        <div style={{ marginTop: "20px" }}>
          <h4>🔊 Lecture du message :</h4>
          <audio controls src={audioURL}></audio>
          <button onClick={rec}>ok</button>
        </div>
      )}
    </div>
  );
}
