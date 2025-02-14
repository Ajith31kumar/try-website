import React from "react";
import "./HowToPlay.css";

const HowToPlay = () => {
  return (
    <section id="howToPlay">
      <div className="container">
        <div className="title">
          <h2>How To Play</h2>
          <p>
            Master your reflexes with our simple yet challenging reaction game.
            Follow these steps to test your speed!
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number blue">1</div>
            <h3>Register</h3>
            <p>Fill in your details to start the game and track your progress</p>
          </div>

          <div className="step">
            <div className="step-number pink">2</div>
            <h3>Wait for Green</h3>
            <p>When you start, you'll see a red circle. Wait for it to turn green</p>
          </div>

          <div className="step">
            <div className="step-number blue">3</div>
            <h3>Click Fast!</h3>
            <p>As soon as the circle turns green, click as quickly as you can</p>
          </div>

          <div className="step">
            <div className="step-number pink">4</div>
            <h3>View Results</h3>
            <p>After 5 attempts, see your average reaction time </p>
          </div>
        </div>

        <div className="pro-tips">
          <h3>Pro Tips</h3>
          <ul>
            <li>
              <span className="bullet"></span> Focus on the circle and minimize distractions
            </li>
            <li>
              <span className="bullet"></span> Don't click too early - it will reset the game
            </li>
            <li>
              <span className="bullet"></span> Try to maintain a consistent clicking position
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HowToPlay;
