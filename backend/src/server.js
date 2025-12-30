import dotenv from "dotenv";
dotenv.config();

import express, { json, response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { stringify } from "qs";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors({ origin: "http://127.0.0.1:4000" }));
app.use(json());

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

    res.json({
      jwtToken: myJwtToken,
      accessToken: access_token,
      user: currentUserResponse,
    });
  } catch (error) {
    console.error("Spotify Auth Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Authentication failed" });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(403).json({ error: "No jwt Token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.user = decoded;

    next();
  });
};

app.post("/topTracks", verifyToken, async (req, res) => {
  try {
    const { accessToken } = req.body;
    const spotifyRes = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        params: {
          limit: 9,
          time_range: "short_term",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(spotifyRes.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: "Failed to fetch top tracks from Spotify",
    });
  }
});

app.post("/topArtists", verifyToken, async (req, res) => {
  try {
    const { accessToken } = req.body;
    const spotifyRes = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        params: {
          limit: 9,
          time_range: "short_term",
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(spotifyRes.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: "Failed to fetch top tracks from Spotify",
    });
  }
});

app.post("/history", verifyToken, async (req, res) => {
  try {
    const { accessToken } = req.body;

    const spotifyRes = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        params: {
          limit: 25,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(spotifyRes.data);
  } catch (error) {
    console.log(response);
    console.log(error);

    res.status(error.response ? error.response.status : 500).json({
      error: "Failed to fetch history from Spotify",
    });
  }
});

app.post("/genai", verifyToken, async (req, res) => {
  const ai = new GoogleGenAI({});
  //get the data for content from req body
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: "hi",
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
      systemInstruction: "You are a cat. Your name is Neko.",
    },
  });
  console.log(response.text);
});

app.listen(3000, () => console.log("Server running at 3000"));
