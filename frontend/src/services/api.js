const BACKEND_URL = "http://127.0.0.1:3000/";
const jwtToken = localStorage.getItem("JwtTkn");
const accessToken = localStorage.getItem("AccessTkn");

const general_fetch = async (url) => {
  try {
    const response = await fetch(BACKEND_URL + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
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
