import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { stringify } from "qs";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://127.0.0.1:4000" }));
app.use(json());

const globalObj = {
  access_token: "",
  user_id: null,
  user_email: "",
};

app.post("/auth", async (req, res) => {
  const { code } = req.body;
  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://127.0.0.1:4000/",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64"),
        },
      }
    );
    const { access_token } = tokenResponse.data;

    const { data: currentUserResponse } = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    const myJwtToken = jwt.sign(
      {
        id: currentUserResponse.id,
        email: currentUserResponse.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    globalObj.access_token = access_token;
    globalObj.user_id = currentUserResponse.id;
    globalObj.user_email = currentUserResponse.email;

    res.json({ token: myJwtToken, user: currentUserResponse });
  } catch (error) {
    console.error("Spotify Auth Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Authentication failed" });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  if (!authHeader)
    return res.status(403).json({ error: "No jwt Token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Token is expired, modified, or invalid
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    res.user = decoded;

    next();
  });
};

app.get("/topTracks", verifyToken, async (req, res) => {

  if(res.user.id !== globalObj.user_id || res.user.email !== globalObj.user_email )
    return res.status(401).json({error:"jwt"})

  const res = axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  });

  res.json();
});

app.listen(3000, () => console.log("Server running at 3000"));
