import "../styles/trackCard.css";
export default function TrackCard({ props }) {
  console.log(props);

  return (
    <div className="track-card">
      <img src={props.images[1].url} alt="Track Image" />

      <div className="card-details-container">
        <a href={props.href} className="track-name">
          {props.name}
        </a>
        <p className="track-popularity">Popularity: {props.popularity}</p>
        <div className="track-authors">
            <i>Artists</i>
          {props.artists.map((artist, index) => (
            <a key={index} href={artist.external_urls.spotify}>
              {artist.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
