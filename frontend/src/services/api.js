//change here
//const BACKEND_URL = "http://127.0.0.1:3000/"; //local dev
const BACKEND_URL = "https://spotifyapi-backend-j843.onrender.com/"; //prod web service on render
const jwtToken = localStorage.getItem("JwtTkn");
const accessToken = localStorage.getItem("AccessTkn");

const general_fetch = async (url, content = null) => {
  try {
    const response = await fetch(BACKEND_URL + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
        content: content,
      }),
    });
    if (!response.ok) {
      throw new Error(
        `status: ${response.status} error: ${await response.json().error}`
      );
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopItems = async (itemName) => {
  return await general_fetch(itemName);
};

export const fetchHistory = async () => {
  return await general_fetch("history");
};

export const fetchRoast = async (content) => {
  return await general_fetch("genai", content);
};
