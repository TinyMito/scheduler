import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // FUNCTION to transition to next mode
  function transition(selectMode, replace = false) {
    if (!replace) {
      setMode(selectMode); // Set the mode
      history.push(selectMode); // push new mode into the history array
    } else {
      if (history.length > 1) {
        history.pop(); // Remove last mode
        history.push(selectMode) // push the new mode
        setMode(history[history.length - 1]); // setMode to the last array value
      }
    }
    
    setHistory(history); // Update the history array
  }

  // FUNCTION to return previous mode
  function back() {
    // prevent history falling out of bound
    if (history.length > 1) {
      history.pop(); // remove last array in history
      setMode(history[history.length - 1]); // setMode to the last array value
    }

    setHistory(history); // Update the history array
  }
 
  return { mode, transition, back }; // return mode and functions
}