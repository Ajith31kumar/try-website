import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReactionGame.css";

const Form = ({ setFormData, handleFormSubmit }) => {
  return (
    <div className="form-wrapperr">
      <h2 className="form-titler">Player Details</h2>
      <form onSubmit={handleFormSubmit} className="form-containerr">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="inputr"
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="inputr"
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
        />
        <select
          required
          className="inputr"
          onChange={(e) => setFormData((prev) => ({ ...prev, sex: e.target.value }))}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="number"
          placeholder="Enter your Number"
          required
          className="inputr"
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Your Age"
          required
          className="inputr"
          onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
        />
        <button type="submit" className="submit-buttonr">Start Playing</button>
      </form>
    </div>
  );
};

const ReactionGame = () => {
  const [page, setPage] = useState("start");
  const [formData, setFormData] = useState({ name: "", email: "", sex: "", phone: "", age: "" });
  const [circleColor, setCircleColor] = useState("red");
  const [reactionTime, setReactionTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [wrongClickCount, setWrongClickCount] = useState(0);
  const [results, setResults] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [greenClicked, setGreenClicked] = useState(false);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPage("game");
    resetGame();
  };

  const startGame = () => {
    setCircleColor("red");
    setCountdown(null);
    setGreenClicked(false);
    setStopwatchTime(0);
    setStopwatchRunning(false);
    
    setTimeout(() => {
      setCircleColor("green");
      setStartTime(performance.now());
      setStopwatchRunning(true);
    }, Math.random() * 2000 + 1000);
  };

  const handleCircleClick = () => {
    if (circleColor === "green" && startTime && !greenClicked) {
      setGreenClicked(true);
      setStopwatchRunning(false);
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(3);
      setReactionTime(timeTaken);
      setClickCount((prev) => prev + 1);
      setResults([...results, timeTaken]);
      setCountdown(5);
    } else if (circleColor === "red" || (circleColor === "green" && greenClicked)) {
      setWrongClickCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    let timer;
    if (stopwatchRunning) {
      timer = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [stopwatchRunning]);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCircleColor("red");
      if (clickCount < 5) {
        startGame();
      } else {
        setPage("result");
        saveGameData();
      }
    }
  }, [countdown]);

  const saveGameData = async () => {
    try {
      await axios.post("http://localhost:5000/save", { ...formData, results, wrongClickCount });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleExit = async () => {
    await saveGameData();
    setPage("start");
  };

  const handleTryAgain = () => {
    setPage("game");
    resetGame();
  };

  const resetGame = () => {
    setClickCount(0);
    setWrongClickCount(0);
    setReactionTime(0);
    setResults([]);
    setGreenClicked(false);
    setStopwatchTime(0);
    setStopwatchRunning(false);
    startGame();
  };

  return (
    <div className="containerr">
      {page === "start" && (
        <button onClick={() => setPage("form")} className="start-buttonr">Start</button>
      )}
      {page === "form" && <Form setFormData={setFormData} handleFormSubmit={handleFormSubmit} />}
      {page === "game" && (
        <div className="game-containerr">
          <div className={`circler ${circleColor}`} onClick={handleCircleClick}></div>
          {circleColor === "green" && (
            <p className="reaction-timer">Stopwatch: {(stopwatchTime / 1000).toFixed(3)} sec</p>
          )}
          {countdown !== null && <p className="countdownr">Countdown: {countdown}</p>}
          <p className="wrong-clickr">Wrong Clicks: {wrongClickCount}</p>
        </div>
      )}
      {page === "result" && (
        <div className="result-containerr">
          <h2>Results</h2>
          <ul>
            {results.map((time, index) => (
              <li key={index}>Attempt {index + 1}: {time} sec</li>
            ))}
          </ul>
          <button onClick={handleTryAgain} className="try-again-buttonr">Try Again</button>
          <button onClick={handleExit} className="exit-buttonr">Exit</button>
        </div>
      )}
    </div>
  );
};

export default ReactionGame;
