import "../styles/topItemCard.css";
export default function TrackCard({ props }) {
  return (
    <div className="card">
      <div className="img-container">
        <img src={props.images[1].url} alt="Track Image" />
      </div>

      <div className="card-details-container">
        <a href={props.href} className="name">
          {props.name}
        </a>
        <p className="popularity">Popularity: {props.popularity}</p>
        <div className="list">
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
