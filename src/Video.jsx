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
      {video && (
        <video
          controls
          src={`${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/upload/${video[0].vid}`}
          className="video-user"
        />
      )}
    </div>
  );
}

export default Video;
