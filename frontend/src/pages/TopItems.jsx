import "../styles/TopItems.css";
import { setTopArtists, setTopTracks } from "../store/slices/topItemsSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopItems } from "../services/api";

export default function TopItems() {
  const dispatch = useDispatch();

  const isTopTracksSet = useSelector((state) => state.topItems.isTopTracksSet);
  const isTopArtistsSet = useSelector(
    (state) => state.topItems.isTopArtistsSet
  );
  const topTracks = useSelector((state) => state.topItems.topTracks);
  const topArtists = useSelector((state) => state.topItems.topArtists);

  const handleTracksClick = async () => {
    const topTracks = await fetchTopItems("topTracks");
    console.log(topTracks.items[0]);

    dispatch(setTopTracks(topTracks.items));
  };
  const handleArtistsClick = async () => {
    const topArtists = await fetchTopItems("topArtists");
    dispatch(setTopArtists(topArtists.items));
  };

  return (
    // create a nice card for both track li and artist li displaying the important data,
    // track - name,popularity,href album.images[i], artists[i].name,artists[i].href

    <div className="top-items-container">
      <section>
        <h2>Top Tracks</h2>
        {isTopTracksSet ? (
          topTracks.map((track, index) => <li key={index}>{track.name}</li>)
        ) : (
          <button className="btn-top-item" onClick={handleTracksClick}>
            Get top tracks
          </button>
        )}
      </section>
      <section>
        <h2>Top Artists</h2>
        {isTopArtistsSet ? (
          topArtists.map((artist, index) => <li key={index}>{artist.name}</li>)
        ) : (
          <button className="btn-top-item" onClick={handleArtistsClick}>
            Get top artists
          </button>
        )}
      </section>
    </div>
  );
}
