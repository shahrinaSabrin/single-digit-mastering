
import React, { useState, useEffect } from 'react';

const FunMathComponent = ({ onRoundEnd, onSubmit,key }) => {
  const [equations, setEquations] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [mathResults, setMathResults] = useState({ total: 0, correct: 0, incorrect: 0 });
  const [startTime, setStartTime] = useState(0);
  let correct=0,incorrect=0,total=0;

  useEffect(() => {
    generateEquations();
    setStartTime(Date.now());
  }, [key]);

  useEffect(() => {
    if (submitted) {
      const endTime = Date.now();
      const timeTakenInSeconds = (endTime - startTime) / 1000;
      onRoundEnd(timeTakenInSeconds,mathResults);
    }
  }, [submitted, startTime, onRoundEnd]);

  function generateEquations() {
    const newEquations = Array.from({ length: 25 }, (_, index) => {
      return generateSingleEquation(index + 1);
    });

    setEquations(newEquations);
  }

  function generateSingleEquation(mathNO) {
    let type = Math.floor(Math.random() * 2) + 1;
    let x, y, z, equationText;
    let expectedAnswer;
    x = Math.floor(Math.random() * 9) + 1;
    y = Math.floor(Math.random() * 9) + 1;
    z = Math.floor(Math.random() * 9) + 1;

    if (type === 1 && x + y > z) {
      equationText = `${x} + ${y} - ${z} = `;
      expectedAnswer = (x + y - z).toString();
    } else if (type === 2 && x - y > 0) {
      equationText = `${x} - ${y} + ${z} = `;
      expectedAnswer = (x - y + z).toString();
    } else {
      return generateSingleEquation(mathNO);
    }

    return { mathNO, equationText, expectedAnswer, userInput: '', correctness: '' };
  }

  function handleSubmit() {
    setSubmitted(true);
    const updatedEquations = equations.map((eq) => {
      const userAnswer = eq.userInput.trim();
      const isCorrect = userAnswer === eq.expectedAnswer;
      if(isCorrect)
      {
        correct++;
      }
      else
      {
        incorrect++;
      }
      total++;
      const result={ total:total, correct:correct, incorrect:incorrect };
      setMathResults(result);
      return {
        ...eq,
        correctness: isCorrect ? '✔' : '✘',
     
      };
    });

    setEquations(updatedEquations);
         console.log(total,correct,incorrect);
    // Call the onSubmit callback with the total time taken
    const endTime = Date.now();
    const totalTime = (endTime - startTime) / 1000;
    onSubmit(totalTime,total,correct,incorrect);
    window.scrollTo(0, 0);
  }

  return (
   <div className="text-center w-full py-8 px:2 lg:px-8 ">
      <div className='bg-no-repeat-cover bg-abacus-url'><div id="equationTable" className="flex justify-center bg-blue-200 items-center opacity-80 py-8 px-12 rounded-md ">
        <table id="equationsTable" className=''>
          <tbody>
            {equations.map((eq) => (
              <tr key={eq.mathNO} className="equation-row">
                {/* <td className="equation-cell">
                  <span className="text-blue-600 font-bold">{eq.mathNO}.</span>
                </td> */}
                <td className="equation-cell py-4">
                  <div className="equation-box">
                    <span className="equation-text text-orange-700 text-xl lg:text-2xl font-bold">{eq.equationText}</span>
                  </div>
                </td>
                <td className="equation-cell text-orange-800 lg:text-3xl font bold">
                  <input
                    type="text"
                    // style={{ fontSize: '20px' }}
                    placeholder='Enter Your Answer'
                    value={eq.userInput}

                    disabled={submitted || eq.correctness === 'correct'}
                    onChange={(e) => {
                      setEquations((prevEquations) => {
                        const updatedEquations = [...prevEquations];
                        const index = updatedEquations.findIndex(
                          (item) => item.mathNO === eq.mathNO
                        );
                        updatedEquations[index].userInput = e.target.value;
                        return updatedEquations;
                      });
                    }}
                  />
                </td>
                <td className="equation-cell">
                  <span
                    className={eq.correctness === 'correct' ? 'text-green-600' : 'text-red-500'}
                  >
                    {eq.correctness}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div ></div>
      <div className='py-4'><button
        onClick={handleSubmit}
        disabled={submitted}
        className="mt-4 bg-orange-600 text-white text-2xl font-bold py-4 px-8 rounded-md animate-bounce"
      >
        Submit Your Answer
      </button></div></div>
   
  );
};

export default FunMathComponent;
