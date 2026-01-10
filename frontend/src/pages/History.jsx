import { useSelector, useDispatch } from "react-redux";
import { setHistory } from "../store/slices/historySlice";
import "../styles/History.css";
import { fetchHistory } from "../services/api";
import HistoryCard from "../components/HistoryCard";

export default function History() {
  const isHistorySet = useSelector((state) => state.history.isHistorySet);
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history.history);

  const handleClick = async () => {
    const responseData = await fetchHistory();
    dispatch(setHistory(responseData.items));
  };
  return (
    <div className="history-container">
      <h2>History</h2>
      <p>Your recently played tracks is here</p>
      <div className="list-container">
        {isHistorySet ? (
          <div className="history-card-container">
            {history.map((historyItem, index) => (
              <HistoryCard
                key={index}
                props={{
                  name: historyItem.track.name,
                  href: historyItem.track.external_urls.spotify,
                  artists: historyItem.track.artists,
                  playedAt: new Date(historyItem.played_at),
                }}
              />
            ))}
            <button onClick={handleClick}>Refresh</button>
          </div>
        ) : (
          <button onClick={handleClick}>Get history</button>
        )}
      </div>
    </div>
  );
}
