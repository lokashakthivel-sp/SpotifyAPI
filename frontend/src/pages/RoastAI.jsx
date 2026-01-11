import "../styles/RoastAI.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoast } from "../services/api.js";
import { setRoast } from "../store/slices/roastSlice.js";

export default function RoastAI() {
  const isTopTracksSet = useSelector((state) => state.topItems.isTopTracksSet);
  const isHistorySet = useSelector((state) => state.history.isHistorySet);

  const topTracks = useSelector((state) => state.topItems.topTracks);
  const history = useSelector((state) => state.history.history);

  const [btnClicked, setBtnClicked] = useState(false);
  const [showErr, setShowErr] = useState(false);

  const isRoastSet = useSelector((state) => state.roast.isRoastSet);
  const roast = useSelector((state) => state.roast.roast);

  const dispatch = useDispatch();

  const handleClick = async () => {
    setBtnClicked(true);
    if (!isTopTracksSet || !isHistorySet) {
      setShowErr(true);
      return;
    }

    const topTracksStr = topTracks
      .map((track, index) => `${index + 1}. ${track.name}`)
      .toString();
    const historyStr = history
      .map((item, index) => `${index + 1}. ${item.track.name}`)
      .toString();
    const content =
      "Top Tracks: " + topTracksStr + "\nRecently played: " + historyStr;

    const responseData = await fetchRoast(content);
    console.log(responseData);
    dispatch(setRoast(responseData));
  };

  return (
    <div className="roast-container">
      <h2>Roast Me</h2>
      <section>
        {isRoastSet || (btnClicked && !showErr) ? (
          <p className="content">{roast ? roast : "Loading..."}</p>
        ) : (
          <>
            <p>
              Want to get roasted based on your top tracks and recently listened
              tracks?
            </p>
            <button onClick={handleClick}>Get Roasted</button>
            {showErr && (
              <p className="error-msg">Get top tracks and history first!</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
