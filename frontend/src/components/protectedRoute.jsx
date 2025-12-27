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

  const BACKEND_URL = "http://127.0.0.1:3000/";

  const authCode = searchParams.get("code");

  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun === false) return;
    const my_login = async () => {
      try {
        if (authCode && !isAuthenticated) {
          //request to backend server running at 3000, passing the authorisation code we got just now
          const response = await fetch(BACKEND_URL + "auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: authCode }),
          });
          if (response.ok) {
            //we get the jwt token and full user data
            const data = await response.json();
            //set user details in auth store(this also updates the isAuthenticated)
            dispatch(login(data.user));

            //set jwt token in local storage
            localStorage.setItem("JwtTkn", data.token);

            setSearchParams({});
          }
        }
      } catch (error) {
        throw new Error(error);
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
