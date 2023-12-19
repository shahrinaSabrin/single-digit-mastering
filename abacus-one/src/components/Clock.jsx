import React, { useState, useEffect } from "react";

const Clock = ({ key, roundEnded, endTime, isActive, onStartGame }) => {
  const [milliseconds, setMilliseconds] = useState(endTime * 1000);
  const [finalTime, setFinalTime] = useState(null);
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => prevMilliseconds + 100);
      }, 100);
    } else {
      clearInterval(interval);

      // Calculate and set the final time when the clock is stopped
      const minutes = Math.floor(milliseconds / (60 * 1000));
      const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
      const timeTaken = minutes * 60 + seconds;

      if (roundEnded.mathResults.correct === 0) {
        setSpeed("You did not solve any math");
      } else {
        setSpeed(
          `${(timeTaken / roundEnded.mathResults.correct).toFixed(
            2
          )} seconds per math`
        );
      }

      setFinalTime(
        `${minutes} minute(s) ${seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })} second(s)`
      );
    }

    return () => clearInterval(interval);
  }, [isActive, milliseconds, roundEnded.mathResults.correct]);

  const formattedTime = () => {
    const minutes = Math.floor(milliseconds / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${minutes}:${seconds.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${centiseconds.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}`;
  };
  const handleStartNewRound = () => {
    // Reset the stopwatch and related state when starting a new round
    setMilliseconds(0);
    setFinalTime(null);
    setSpeed(null);
  };
  return (
    <div className="text-center w-full py-8 px-8 bg-progress-url">
      <div className="py-4 bg-blue-300 rounded-md opacity-70">
        <h1 className="text-6xl">{formattedTime()}</h1>
        <div className="result-box mt-4">
          {isActive ? (
            <p>Total Maths: 25</p>
          ) : (
            <div id="progress-report" className="font-bold text-xl">
              <h1 className="text-3xl text-orange-800 py-2">
                Progress Report :
              </h1>
              <p className="py-2">
                Total Maths: {roundEnded.mathResults.total}
              </p>
              <p className="py-2 text-green-800">
                Correct: {roundEnded.mathResults.correct}
              </p>
              <p className="text-red-600">
                Wrong: {roundEnded.mathResults.incorrect}
              </p>
              <p className="py-2">Time Taken: {finalTime}</p>
              <p className="py-2">
                Accuracy:{" "}
                {(roundEnded.mathResults.correct /
                  roundEnded.mathResults.total) *
                  100}
                %
              </p>
              <p className="py-2">{`Speed: ${speed}`}</p>
              <div className=" py-4">
                <button
                  className="bg-orange-600 animate-bounce text-white font-bold py-2 px-4 rounded text-xl"
                  onClick={() => {
                    handleStartNewRound();
                    onStartGame();
                  }}
                >
                  Start A new Round
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clock;
