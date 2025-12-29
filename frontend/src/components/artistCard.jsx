import "../styles/topItemCard.css";
export default function ArtistCard({ props }) {
  return (
    <div className="card">
      <img src={props.images[1].url} alt="Artist Image" />

      <div className="card-details-container">
        <a href={props.href} className="name">
          {props.name}
        </a>
        <p className="popularity">Popularity: {props.popularity}</p>
        <div className="list">
          <i>Genres</i>
          {props.genres.slice(0, 3).map((genre, index) => (
            <p key={index}>{genre}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
