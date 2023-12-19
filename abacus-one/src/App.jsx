import React, { useState } from "react";
import FunMathComponent from "./components/Math";
import Clock from "./components/Clock";

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [endTime, setEndTime] = useState(0);
  const [mathResults, setMathResults] = useState({
    total: 0,
    correct: 0,
    incorrect: 0,
  });
  const [isClockActive, setIsClockActive] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
    setIsClockActive(true);
  };

  const handleRoundEnd = (time, mathResults) => {
    setEndTime(time);
    setMathResults(mathResults);
  };

  const handleMathSubmit = (totalTime, total, correct, incorrect) => {
    setIsClockActive(false);
    handleRoundEnd(totalTime, { total, correct, incorrect }); // Pass the values to handleRoundEnd
  };

  return (
    <div className="flex-col py-4 items-center justify-center h-screen px-60 gap-8 ">
      {isGameStarted ? (
        <div className="">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold mb-4 text-orange-600">
              Welcome to Fun Math Game!
            </h1>
          </div>
          <div className="">
             <Clock
              roundStarted={isGameStarted}
              roundEnded={{ mathResults }}
              endTime={endTime}
              isActive={isClockActive}
            />
            <FunMathComponent
              onRoundEnd={handleRoundEnd}
              onSubmit={handleMathSubmit}
            />
           
          </div>
        </div>
      ) : (
        <div>
          {" "}
        <div className="flex justify-center">  <h1 className=" py-4 text-4xl font-bold italic text-orange-600">Play the Fun Math Game to Explore Your Math Skills!</h1></div>
          <div className="flex justify-center gap-8 py-8">
            <img
              src="../public/Images/images (1).jpeg" width='full'
              alt=""
            />
            <img src="../public/Images/images.jpeg" alt="" />
          </div>
          <div className="flex justify-center py-4 animate-bounce">
            <button
              onClick={handleStartGame}
              className="bg-orange-600 text-white font-bold py-2 px-4 rounded text-xl"
            >
              Click Here to Start the Fun Math Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
