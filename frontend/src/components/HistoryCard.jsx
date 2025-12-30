import "../styles/historyCard.css";
export default function HistoryCard({ props }) {
  const timestamp = props.playedAt;
  const options = {
    timeStyle: "short",
    dateStyle: "full",
  };
  return (
    <div className="history-card">
      <a href={props.href} className="name">
        {props.name}
      </a>
      <div className="artist">
        {props.artists.slice(0, 3).map((artist, index) => {
          return (
            <>
              <a key={index} href={artist.external_urls.spotify}>
                {artist.name}
              </a>
              {index !== props.artists.length - 1 && index !== 2 ? (
                <p>|</p>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>
      <p className="timestamp">
        {Intl.DateTimeFormat("en-IN", options).format(timestamp)}
      </p>
    </div>
  );
}
