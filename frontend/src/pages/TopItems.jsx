import custom_fetch from "../services/api";
import "../styles/TopItems.css";

import { setTopArtists, setTopTracks } from "../store/slices/topItemsSlice";

export default function TopItems() {
  const handleTracksClick = async () => {
    const responseData = custom_fetch("topTracks");
    console.log(responseData);

    //setTopTracks(responseData.)
  };
  const handleArtistsClick = async () => {
    custom_fetch();
  };
  return (
    <div className="top-items-container">
      <section>
        <h2>Top Tracks</h2>
        <button className="btn-top-item" onClick={handleTracksClick}>
          Get top tracks
        </button>
      </section>
      <section>
        <h2>Top Artists</h2>
        <button className="btn-top-item" onClick={handleArtistsClick}>
          Get top artists
        </button>
      </section>
    </div>
  );
}
