const BACKEND_URL = "http://127.0.0.1:3000/";
const JwtTkn = localStorage.getItem("JwtTkn");

export default async function custom_fetch(
  url,
  {
    method = "GET",
    body = null,
    headers = { Authorization: "Bearer " + JwtTkn },
  } = {}
) {
  const options = {
    method: method,
    headers: { ...headers },
  };

  if (body !== null) {
    if (!options["Content-Type"]) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    } else {
      options.body = body;
    }
  }

  const res = fetch(BACKEND_URL + url, options);
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
  return await res.json();
}
