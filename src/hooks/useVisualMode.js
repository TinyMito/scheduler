import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // function to transition to next mode
  function transition(selectMode) {
    setMode(selectMode);
  }

  // function to return previous mode
  function back() {
    setMode();
  }

  // return mode and functions
  return { mode, transition, back };
}