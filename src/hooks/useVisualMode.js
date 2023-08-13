import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // FUNCTION to transition to next mode
  function transition(selectMode, replace = false) {
    setHistory(prev => {
      const newHistory = [...prev]; // Create new const to prevent mutation

      if (replace) {
        newHistory.pop(); // Remove last mode
      }
      
      newHistory.push(selectMode); // Add the new selectMode to History Array
      setMode(selectMode); // Swithc to teh new selectMode
      return newHistory;
    });
  }

  // FUNCTION to return previous mode
  function back() {
    // prevent history falling out of bound
    if (history.length > 1) {
      setHistory(prev => {
        const newHistory = [...prev]; // Create new const to prevent mutation
        newHistory.pop(); // remove last array in history
        setMode(newHistory[newHistory.length - 1]); // setMode to the last array value
        return newHistory
      })
    }
  }
 
  return { mode, transition, back }; // return mode and functions
}