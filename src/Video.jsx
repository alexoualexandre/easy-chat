import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Video() {
  if (!Cookies.get("auth")) {
    window.location.href = "/home";
  }
  const location = useLocation();
  const [video, setVideo] = useState("");
  const getSearchParams = () => {
    return new URLSearchParams(location.search);
  };
  const params = getSearchParams();
  const env = import.meta.env;
  useEffect(() => {
    fetch(
      `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/get-video/${params.get("dest")}`
    )
      .then((response) => response.json())
      .then((resp) => {
        setVideo(resp.user);
      });
  }, []);

  // console.log(video[0].vid);

  return (
    <div className="block-this-video">
      <Link to={`/home?dest=${params.get("dest")}`}>
        <button
          type="button"
          className="x-option"
          style={{ color: "white", backgroundColor: "transparent", zIndex: 1 }}
        >
          ×
        </button>
      </Link>
      {video && video[0].vid !== " " ? (
        <video
          controls
          src={`${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload/${video[0].vid}`}
          className="video-user"
        />
      ) : (
        <>
          <img
            src="istockphoto-1316006857-612x612.png"
            alt="oups"
            className="oups"
          />
          <h3
            style={{
              color: "white",
              width: "100%",
              height: "20%",
              position: "absolute",
              top: "70%",
              textAlign: "center",
            }}
          >
            Cet utilisateur n&apos;as pas de vidéo
          </h3>
        </>
      )}
    </div>
  );
}

export default Video;
