
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://lpabcknd.onrender.com");

function TeacherPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ value: "", correct: false }]);
  const [results, setResults] = useState([]);
  const [canAsk, setCanAsk] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleOptionChange = (index, newValue) => {
    const updatedOptions = [...options];
    updatedOptions[index].value = newValue;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, { value: "", correct: false }]);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const askQuestion = () => {
    if (!question.trim() || options.some((o) => !o.value.trim())) {console.log("there is no question")return};

    socket.emit("askQuestion", { question, options });
    console.log("asking question -->", question, options);
    setCanAsk(false);
    setShowResults(true);
    setTimer(60);
    const countdownInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setCanAsk(true); // Re-enable the "Ask Question" button when timer ends
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnotherQuestion = () =>{
    if (!canAsk) return;
    setShowResults(false);
  }

  useEffect(() => {
    socket.on("updateResults", (data) => setResults(data));
  }, []);

  return (
    <>
      {!showResults && (
        <div className="min-h-[90vh] flex items-start justify-start bg-gray-50 px-20 py-10">
          <div className="max-w-3xl">
            <div className="inline-block px-5 py-1.5 text-sm font-medium text-white rounded-full mb-3 bg-gradient-to-r from-[#7765DA] to-[#4F0DCE]">
              ✨ Intervue Poll
            </div>
            <h1 className="text-2xl font-bold mt-4">
              Let’s <span className="font-extrabold">Get Started</span>
            </h1>
            <p className="text-gray-600 mt-2">
              You’ll have the ability to create and manage polls, ask questions,
              and monitor your students' responses in real-time.
            </p>

            <label className="block mt-4 font-semibold">
              Enter your question
            </label>
            <textarea
              className="w-full p-2 border rounded mt-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
            />

            <div className="mt-4">
              <label className="block font-semibold">Edit Options</label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-purple-500 text-white rounded-full">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    value={option.value}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  <div className="flex items-center space-x-1">
                    <label className="text-sm">Is it Correct?</label>
                    <input
                      type="radio"
                      name={`correct${index}`}
                      className="ml-1"
                    />{" "}
                    Yes
                    <input
                      type="radio"
                      name={`correct${index}`}
                      className="ml-1"
                    />{" "}
                    No
                  </div>
                  {options.length > 1 && (
                    <button
                      className="text-red-500"
                      onClick={() => removeOption(index)}
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))}
              <button
                className="mt-2 text-[#7765DA] border-2 border-[#7765DA] rounded-xl p-2"
                onClick={addOption}
              >
                + Add More Option
              </button>
            </div>
          </div>
        </div>
      )}

     {!showResults && 
      <div>

      <hr className="my-2 border-gray-300 w-full" />
      <div className="flex justify-end">
        <button
          className="text-white font-semibold inline-block px-10 py-3 rounded-full transition bg-gradient-to-r from-[#7765DA] to-[#5767D0] mr-2"
          onClick={askQuestion}
          disabled={!canAsk}
          >
          {canAsk ? "Ask Question" : `Wait ${timer} seconds`}{" "}
        </button>
      </div>
          </div>
    }

{showResults && results.length === 0 && (
  <div className="m-auto font-semibold text-black">
    Waiting for responses...
  </div>
)}

{showResults && results.length > 0 && (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="w-full max-w-lg p-6">
      <h2 className="font-semibold">Question</h2>
      <div className="bg-gradient-to-r from-gray-700 to-gray-500 text-white p-3 rounded-t-md">
        <h2 className="font-semibold">{question}</h2>
      </div>
      {results.map(({ optionIndex, percentage }) => (
        <div
          key={optionIndex}
          className="relative flex items-center p-3 border rounded-lg mb-2"
          style={{
            background: `linear-gradient(to right, #8b5cf6 ${percentage}%, #f3f4f6 ${percentage}%)`,
          }}
        >
          <span className="w-6 h-6 flex items-center justify-center rounded-full mr-2 bg-purple-500 text-white">
            {optionIndex + 1}
          </span>
          <span className="text-gray-800 flex-grow">
            {options[optionIndex]?.value || "Unknown Option"}
          </span>
          <span className="text-gray-700 font-medium">{`${percentage}%`}</span>
        </div>
      ))}
    </div>
    <div>
      <button
        onClick={handleAnotherQuestion}
        className={`text-white font-semibold inline-block ml-60 px-10 py-3 rounded-full transition bg-gradient-to-r from-[#7765DA] to-[#5767D0] mr-2 ${
          canAsk ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!canAsk} // Disable the button until the timer ends
      >
        {canAsk ? "+ Ask New Question" : `Wait ${timer} seconds`}
      </button>
    </div>
  </div>
)}

    </>
  );
}

export default TeacherPage;
