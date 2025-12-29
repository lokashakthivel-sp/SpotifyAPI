import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleClick = () => {
    const CLIENT_ID = "b4569498e48c4cad88e924fb8f37c4d7";
    const REDIRECT_URI = "http://127.0.0.1:4000/";
    const SCOPES =
      "user-read-private user-read-email user-top-read user-read-recently-played";

    const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
    //first goto to spotify for getting authorisation code
    window.location.href = spotifyUrl;
  };

  return (
    <div className="login-container">
      <div className="inner-container">
        <div className="site-details">
          <img src="/src/assets/logo.svg" alt="" height="100px" width="100px" />
          <h3>
            <span className="details-text">
              The SpotifyAPI web application is a interactive tool to view your
              Spotify data and actions in a different prespective.
            </span>
            <br />
            <br />
            Login to Spotify to continue
          </h3>
        </div>
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
}
