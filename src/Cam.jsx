import { useEffect, useRef, useState } from "react";

const App = () => {
  const videoRef = useRef(null);
  const recordedRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (!display) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: { echoCancellation: true },
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.volume = 0;
          }
        } catch (err) {
          console.error("Erreur d'accès à la caméra :", err);
        }
      };

      startCamera();
      return () => {
        streamRef.current?.getTracks().forEach((track) => track.stop());
      };
    }
  }, []);

  const startRecording = () => {
    setDisplay(false);
    const options = { mimeType: "video/webm" };
    const mediaRecorder = new MediaRecorder(streamRef.current, options);
    mediaRecorderRef.current = mediaRecorder;
    videoRef.current.style.display = "block";

    let tempRecordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        tempRecordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      setTimeout(() => {
        const blob = new Blob(tempRecordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        if (recordedRef.current) {
          recordedRef.current.src = url;
          recordedRef.current.load();
        }
        setDownloadUrl(url);
        videoRef.current.style.display = "none";
      }, 100);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setDisplay(true);
  };

  return (
    <div className="block-cam">
      <div className="superpose">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ position: "absolute", left: 0, top: 0, width: "100%" }}
        />
        <video
          ref={recordedRef}
          controls
          width="100%"
          style={
            !display
              ? { display: "none" }
              : {
                  display: "block",
                  zIndex: 1,
                  position: "absolute",
                  left: 0,
                  top: 0,
                }
          }
        />
      </div>
      <button
        onClick={startRecording}
        disabled={isRecording}
        style={{ position: "absolute", bottom: "0%" }}
      >
        {!display ? "Démarrer l'enregistrement" : "recommencer"}
      </button>

      {display ? (
        downloadUrl && (
          <button style={{ position: "absolute", bottom: "0%", right: 0 }}>
            <a href={downloadUrl} download="video.webm">
              {display ? "enregistré" : ""}
            </a>
          </button>
        )
      ) : (
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          style={{ position: "absolute", right: 0, bottom: "0%" }}
        >
          Arrêter l&apos;enregistrement
        </button>
      )}
    </div>
  );
};

export default App;
