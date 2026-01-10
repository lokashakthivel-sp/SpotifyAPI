import "../styles/TopItems.css";
import { setTopArtists, setTopTracks } from "../store/slices/topItemsSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopItems } from "../services/api";
import TrackCard from "../components/trackCard";
import ArtistCard from "../components/artistCard";

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

    dispatch(setTopTracks(topTracks.items));
  };
  const handleArtistsClick = async () => {
    const topArtists = await fetchTopItems("topArtists");
    dispatch(setTopArtists(topArtists.items));
  };

  return (
    <div className="top-items-container">
      <section>
        <h2>Top Tracks</h2>
        <div className="card-container">
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
        <div className="card-container">
          {isTopArtistsSet ? (
            topArtists.map((artist, index) => (
              <ArtistCard
                key={index}
                props={{
                  name: artist.name,
                  popularity: artist.popularity,
                  href: artist.external_urls.spotify,
                  followers: artist.followers.total,
                  images: artist.images,
                  genres: artist.genres,
                }}
              />
            ))
          ) : (
            <div className="detail-btn-container">
              <p>Get to know about the top artists you listen the most often</p>
              <button className="btn-top-item" onClick={handleArtistsClick}>
                Get top artists
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
