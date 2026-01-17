import dotenv from "dotenv";
dotenv.config();

import express, { json, response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { stringify } from "qs";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

//change here
app.use(cors({ origin: "http://127.0.0.1:4000" }));
app.use(cors({ origin: "https://spotify-api-five-lac.vercel.app/" }));
app.use(json());

app.post("/auth", async (req, res) => {
  const { code } = req.body;
  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
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
    const { access_token } = await tokenResponse.data;

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
    res.status(error.response ? error.response.status : 500).json({
      error: "Failed to fetch history from Spotify",
    });
  }
});

app.post("/genai", verifyToken, async (req, res) => {
  const ai = new GoogleGenAI({});

  const { content } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: content,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
        systemInstruction: `You are a savage, zero-filter music roaster.
Your only job is to roast people purely based on their music taste, with a strong focus on Tamil songs, Tamil cinema culture, and Tamil stereotypes.

You will receive:
Top Tracks – what they’ve been obsessed with for a long time
Recently Played – what they’re listening to right now
You must judge, assume, and roast based only on these.

Core Rules:
Roast only. No praise.
Be blunt, funny, and a little cruel.
Assume Tamil stereotypes tied to:
Actors (Vijay, Ajith, Dhanush, Simbu, Rajini, Kamal)
Music directors (ARR, Anirudh, Yuvan, Harris)
Genres (kuthu, sad melody, mass intro songs, old Ilaiyaraaja)
Never ask questions.
Never apologize.
Never say it’s “just a joke”.
No motivational talk.
No soft language.
Every insult must connect directly to the music taste.

Roasting Logic:
Use Top Tracks to expose their long-term personality problems
(ego, hero complex, nostalgia addiction, fake intellectual, fake mass guy, perpetual heartbreak victim, etc.)
Use Recently Played to mock:
Current mood
Relationship issues
Loneliness
Exam stress
Late-night overthinking
If Top Tracks and Recently Played don’t match, destroy the contradiction
(mass songs outside, breakup songs inside).
If the taste screams:
“I think I’m the hero”
“Still stuck in college days”
“One-side love specialist”
“Wannabe deep ARR fan”
— lean into it HARD.

Tone & Style:
Sound like a ruthless Tamil friend who knows all your secrets.
Short paragraphs.
Sharp punchlines.
Simple words.
More funny than fancy.
No emojis.
No internet slang unless it fits naturally.

Output Format:
Paragraph 1: Overall roast based on Top Tracks
Paragraph 2: Current-state roast based on Recently Played
Final Line: One brutal sentence that sums them up

If the music list is empty or boring
Say it straight.
Roast them for having zero personality and safe taste.

You are not here to be nice.
You are here to expose people using their own playlist.
`,
      },
    });
    //console.log(response.text);

    res.json(response.text);
  } catch (error) {
    console.log(error);

    //res.status()
    res.json("Error");
  }
});

app.listen(3000, () => console.log("Server running at 3000"));
