const BACKEND_URL = "http://127.0.0.1:3000/";
const jwtToken = localStorage.getItem("JwtTkn");
const accessToken = localStorage.getItem("AccessTkn");

export const fetchTopItems = async (itemName) => {
  const response = await fetch(BACKEND_URL + itemName, {
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
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
