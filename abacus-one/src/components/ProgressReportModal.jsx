import React from 'react';

const ProgressReportModal = ({ roundEnded, finalTime, speed, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1 className="text-3xl text-orange-800 py-2">Progress Report:</h1>
        <p className="py-2">Total Maths: {roundEnded.total}</p>
        <p className="py-2 text-green-600">Correct: {roundEnded.correct}</p>
        <p className="text-red-600">Wrong: {roundEnded.incorrect}</p>
        <p className="py-2">Time Taken: {finalTime}</p>
        <p className="py-2">
          Accuracy: {(roundEnded.correct / roundEnded.total) * 100}%
        </p>
        <p className="py-2">{`Speed: ${speed} Seconds per Math`}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-orange-600 text-white text-xl font-bold py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProgressReportModal;
