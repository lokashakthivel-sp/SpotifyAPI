import { useSelector } from "react-redux";
import "../styles/Home.css";

function Home() {
  const user = useSelector((state) => state.auth.user);

  function getCountryName(code, locale = "en") {
    try {
      const regionNames = new Intl.DisplayNames([locale], { type: "region" });
      return regionNames.of(code.toUpperCase());
    } catch (error) {
      console.error("Error creating Intl.DisplayNames:", error);
      return NaN;
    }
  }

  return (
    <div className="home-container">
      <section className="hero-container">
        <h1>
          Stay with Music,{" "}
          <span className="user-name">{user.display_name}</span>
        </h1>
      </section>

      <section className="details-container">
        <h2>User Details</h2>
        <div className="details">
          <div>
            <p>Country: {getCountryName(user?.country)}</p>
            <p>Followers: {user?.followers?.total}</p>
          </div>
          <div>
            <p>Email: {user?.email}</p>

            <p>Premium: {user?.product === "free" ? "No" : "Yes"}</p>
          </div>
        </div>
        <p>
          User link:{" "}
          <a href={`${user?.external_urls?.spotify}`}>
            {user?.external_urls?.spotify}
          </a>
        </p>
      </section>
    </div>
  );
}

export default Home;
