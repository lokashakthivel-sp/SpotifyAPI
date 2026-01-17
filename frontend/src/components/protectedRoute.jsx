import React from "react";
import { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { login } from "../store/slices/authSlice";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  //change here
  //const BACKEND_URL = "http://127.0.0.1:3000/"; //local dev
  const BACKEND_URL = "https://spotifyapi-backend-j843.onrender.com/"; //local dev

  const authCode = searchParams.get("code");

  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun === false) return;
    const my_login = async () => {
      if (authCode && !isAuthenticated) {
        const response = await fetch(BACKEND_URL + "auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: authCode }),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("JwtTkn", data.jwtToken);
          localStorage.setItem("AccessTkn", data.accessToken);
          setSearchParams({});
          dispatch(login(data.user));
        } else {
          throw new Error(
            `Error logging in: Status: ${response.status} \n ${response.error}`
          );
        }
      }
    };
    my_login();
    return () => {
      shouldRun.current = false;
    };
  }, [authCode, isAuthenticated, dispatch, setSearchParams]);

  if (authCode) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          color: "var(--spotify-color1)",
          height: "100vh",
          backgroundColor: "var(--main-bg-color)",
        }}
      >
        Verifying Login...
      </div>
    );
  }

  if (isAuthenticated) return <Outlet />;
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
