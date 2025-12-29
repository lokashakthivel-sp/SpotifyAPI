import { useSelector, useDispatch } from "react-redux";
import { setHistory } from "../store/slices/historySlice";
import "../styles/History.css";
import { fetchHistory } from "../services/api";

export default function History() {
  const isHistorySet = useSelector((state) => state.history.isHistorySet);
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history.history);

  const handleClick = async () => {
    const responseData = await fetchHistory();
    console.log(responseData.items[0]);
    dispatch(setHistory(responseData.items));
  };
  return (
    <div className="history-container">
      <h2>History</h2>
      <p>Your recently played tracks is here</p>
      <div className="list-container">
        {isHistorySet ? (
          <>
            {history.map((historyItem, index) => (
              <li key={index}>{historyItem.track.name}</li>
            ))}
            <button onClick={handleClick}>Refresh</button>;
          </>
        ) : (
          <>
            <p>no history yet</p>
            <button onClick={handleClick}>Get history</button>
          </>
        )}
      </div>
    </div>
  );
}
