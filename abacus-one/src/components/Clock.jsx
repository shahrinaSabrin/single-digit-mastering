import React, { useState, useEffect } from "react";

const Clock = ({ roundStarted, roundEnded, endTime, isActive }) => {
  const [milliseconds, setMilliseconds] = useState(endTime * 1000);
  const [finalTime, setFinalTime] = useState(null);
  let timeTaken, speed;
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
      timeTaken = minutes * 60 + seconds;

      setFinalTime(
        `${minutes}:${seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`
      );
    }

    return () => clearInterval(interval);
  }, [isActive, milliseconds]);

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

  return (
    <div className="text-center w-full py-8 px-8">
      <div className="py-4 bg-blue-300 rounded-md">
        <h1 className="text-6xl">{formattedTime()}</h1>
        <div className="result-box mt-4">
          {isActive ? (
            <p>Total Maths: 25</p>
          ) : (
            <div className="font-bold text-xl">
              {" "}
              <h1 className="text-3xl text-orange-800 py-2">
                Progress Report :
              </h1>
              <p className="py-2">
                Total Maths: {roundEnded.mathResults.total}
              </p>
              <p className="py-2 text-green-600">
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
              {/* <p className="py-2">
                {roundEnded.mathResults.correct !== 0 &&
                !isNaN(parseFloat(roundEnded.mathResults.correct)) &&
                !isNaN(parseFloat(timeTaken))
                  ? `Speed: ${
                      parseFloat(timeTaken) /
                      parseFloat(roundEnded.mathResults.correct)
                    } seconds/math`
                  : "You did not solve any Math."}
              </p> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clock;
