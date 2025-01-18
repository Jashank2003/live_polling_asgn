import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (name.trim() === "") {
      alert("Please enter your name.");
    } else {
      navigate("/student-poll", { state: { studentName: name } });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-3xl text-center">
          <div className="inline-block px-5 py-1.5 text-sm font-medium text-white rounded-full mb-3 bg-gradient-to-r from-[#7765DA] to-[#4F0DCE]">
            ✨ Intervue Poll
          </div>

          <h1 className="text-3xl mb-3">
            Let's <span className="font-bold tracking-wide">Get Started</span>
          </h1>
          <p className="text-gray-600 mb-4 max-w-lg">
            If you’re a student, you’ll be able to{" "}
            <span className="font-bold">submit your answers</span>, participate
            in live polls, and see how your responses compare with your
            classmates.
          </p>

          <div className="m-auto flex flex-col justify-start max-w-md mb-4">
            <p className="text-left p-2 font-semibold">Enter Your Name</p>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="px-4 py-2 ml-2 font-semibold rounded-sm bg-gray-200 outline-none"
            />
          </div>

          <button
            onClick={handleContinue}
            className="text-white font-semibold inline-block px-10 py-2 rounded-full transition bg-gradient-to-r from-[#7765DA] to-[#5767D0]"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default StudentPage;
