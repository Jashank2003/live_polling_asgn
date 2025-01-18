

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your backend URL

function StudentPollPage() {
  const [question, setQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [canVote, setCanVote] = useState(true);
  const [timer, setTimer] = useState(60);
  const [showResults,setShowResults] = useState(false);

  useEffect(() => {
    socket.on("newQuestion", (data) => {
      setQuestion(data);
      setShowResults(false);
      setResults([]);
      setCanVote(true);
      setTimer(60);
      setTimeout(() => setCanVote(false), 60000); // 60-second voting window
    });

    socket.on("updateResults", (data) => setResults(data));
  }, []);

  useEffect(() => {
    if (timer > 0 && canVote) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); // Clear the interval on component unmount or question change
    }
  }, [timer, canVote]);

  const submitVote = () => {
    if (selectedOption !== null) {
      socket.emit("submitVote", selectedOption); // Send vote to server
      setCanVote(false);
      setShowResults(true);
    }
  };

  return (
    <>
   {!showResults && <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {!question ? (
        <h1 className="text-2xl font-bold text-black">Waiting for teacher to ask a question...</h1>
      ) : (
        <div className="w-full max-w-lg  p-6">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h1 className="text-lg font-bold">Question</h1>
            <span
              className={`font-semibold ${
                timer > 10 ? "text-green-500" : "text-red-500"
              }`}
            >
              ⏳ {`00:${timer.toString().padStart(2, "0")}`}
            </span>
          </div>
          <div className="bg-gradient-to-r from-gray-700 to-gray-500 text-white p-3 rounded-t-md">
            <h2 className="font-semibold">{question.question}</h2>
          </div>
          <div className="border rounded-b-md p-4">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center p-3 border rounded-lg mb-2 cursor-pointer ${
                  selectedOption === index ? "border-purple-500 bg-purple-100" : "bg-gray-100"
                }`}
                onClick={() => canVote && setSelectedOption(index)}
              >
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${
                    selectedOption === index ? "bg-purple-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-gray-800">{option.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
            {question &&<button
              className=" text-white font-semibold inline-block  ml-60 px-10 py-3 rounded-full transition bg-gradient-to-r from-[#7765DA] to-[#5767D0] mr-2"
              onClick={submitVote}
              disabled={!canVote}
              >
              Submit
            </button>}
            </div>
}

{showResults && results.length > 0 && (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="w-full max-w-lg  p-6">
    
    <h2 className="font-semibold">Question</h2>
    <div className="bg-gradient-to-r from-gray-700 to-gray-500 text-white p-3 rounded-t-md">
            <h2 className="font-semibold">{question.question}</h2>
          </div>
    {results.map(({ optionIndex, percentage }) => (
      <div
      key={optionIndex}
      className="relative flex items-center p-3 border rounded-lg mb-2"
        style={{
          background: `linear-gradient(to right, #8b5cf6 ${percentage}%, #f3f4f6 ${percentage}%)`, // Dynamic background
        }}
        >
        <span
          className="w-6 h-6 flex items-center justify-center rounded-full mr-2 bg-purple-500 text-white"
          >
          {optionIndex + 1}
        </span>
        <span className="text-gray-800 flex-grow">{`${question.options[optionIndex].value}`}</span>
        <span className="text-gray-700 font-medium">{`${percentage}%`}</span>

      </div>
    ))}
    </div>
    <div className="mt-5 "><h1 className="font-semibold text-black ">Wait for Teacher to ask another question</h1></div>
  </div>
  
)}

</>
  );
}

export default StudentPollPage;
