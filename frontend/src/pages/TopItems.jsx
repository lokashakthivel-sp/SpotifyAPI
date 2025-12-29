import "../styles/TopItems.css";
import { setTopArtists, setTopTracks } from "../store/slices/topItemsSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopItems } from "../services/api";
import TrackCard from "../components/trackCard";

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
    console.log(topArtists.items[0]);

    dispatch(setTopArtists(topArtists.items));
  };

  return (
    // create a nice card for both track li and artist li displaying the important data,
    // track - name,popularity,href album.images[i], artists[i].name,artists[i].href

    <div className="top-items-container">
      <section>
        <h2>Top Tracks</h2>
        <div className="track-card-container">
          {isTopTracksSet ? (
            topTracks.map((track, index) => (
              <TrackCard
                key={index}
                props={{
                  name: track.name,
                  popularity: track.popularity,
                  href: track.external_urls.spotify,
                  images: track.album.images,
                  artists: track.artists,
                }}
              />
            ))
          ) : (
            <div className="detail-btn-container">
              <p>Get to know about the top tracks you listen the most often</p>
              <button className="btn-top-item" onClick={handleTracksClick}>
                Get top tracks
              </button>
            </div>
          )}
        </div>
      </section>
      <section>
        <h2>Top Artists</h2>
        {isTopArtistsSet ? (
          topArtists.map((artist, index) => <li key={index}>{artist.name}</li>)
        ) : (
          <div className="detail-btn-container">
            <p>Get to know about the top artists you listen the most often</p>
            <button className="btn-top-item" onClick={handleArtistsClick}>
              Get top artists
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
