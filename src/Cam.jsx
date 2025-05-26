import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "./Context";
import Cookies from "js-cookie";

const App = () => {
  if (!Cookies.get("auth")) {
    window.location.href = "/home";
  }

  const videoRef = useRef(null);
  const buttonLeft = useRef(null);
  const buttonRight = useRef(null);
  const recordedRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState("");
  const [point, setPoint] = useState(false);
  const [vid, setVid] = useState(" ");
  const [gif, setGif] = useState(false);

  const { VITE_API_HTTP, VITE_API_URL, VITE_API_SERVER_PORT } = import.meta.env;

  const { setBurgerMember } = MyContext();

  const location = useLocation();
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();

  useEffect(() => {
    fetch(
      `${VITE_API_HTTP}://${VITE_API_URL}:${VITE_API_SERVER_PORT}/get-data-video/${Cookies.get("auth")}`
    )
      .then((response) => response.json())
      .then((resp) => {
        setVid(resp.user[0].vid);
      });
  }, []);

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
    setPoint(true);
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
        const formData = new FormData();
        formData.append("video", blob, "video.webm");
        setData(formData);

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
  const rec = () => {
    if (vid !== " ") {
      fetch(
        `${VITE_API_HTTP}://${VITE_API_URL}:${VITE_API_SERVER_PORT}/unlink-video`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: vid }),
        }
      )
        .then((response) => response.json())
        .then((resp) => {
          console.log(resp.message);
        });
    }

    buttonLeft.current.style.display = "none";
    buttonRight.current.style.display = "none";

    setGif(true);

    fetch(`${VITE_API_HTTP}://${VITE_API_URL}:3311/videocam`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((elem) => {
        fetch(
          `${VITE_API_HTTP}://${VITE_API_URL}:${VITE_API_SERVER_PORT}/update-video`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ D: elem.nvName, C: Cookies.get("auth") }),
          }
        );
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la vidéo:", error);
      });
  };

  return (
    <div className="block-cam">
      {gif && <img src="tick.gif" alt="validé" className="tick" />}
      <Link to={`/home?dest=${params.get("dest")}`}>
        <button
          type="button"
          className="x"
          onClick={() => {
            setBurgerMember(false);
          }}
        >
          ×
        </button>
      </Link>
      <div className="superpose">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
          }}
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
        className="recording"
        ref={buttonLeft}
      >
        {!display ? (
          <div className="enregistrement">
            <img src="Frame1.png" style={{ width: "100%", height: "100%" }} />

            <img
              src="point.png"
              className={!point ? "point-fixe" : "point-move"}
            />
          </div>
        ) : (
          <div className="recommencer">
            <img src="poucebas.png" style={{ width: "100%", height: "100%" }} />
          </div>
        )}
      </button>

      {display ? (
        downloadUrl && (
          <button onClick={rec} className="valide-video" ref={buttonRight}>
            {display ? (
              <div className="enregistrer-video">
                <img
                  src="poucehaut.png"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ) : (
              ""
            )}
          </button>
        )
      ) : (
        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="stop-rec"
        >
          <img src="stop.png" style={{ width: "100%", height: "100%" }} />
        </button>
      )}
    </div>
  );
};

export default App;
