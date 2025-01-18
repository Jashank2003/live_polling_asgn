import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl text-center">
        <div className="inline-block px-5  py-1.5 text-sm font-medium text-white rounded-full mb-3 bg-gradient-to-r from-[#7765DA] to-[#4F0DCE]">
          ✨ Intervue Poll
        </div>

        <h1 className="text-3xl mb-3">
          Welcome to the <span className="font-bold">Live Polling System</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Please select the role that best describes you to begin using the live polling system.
        </p>

        <div className="flex justify-center gap-6 mb-8">
          {/*  Student Page link */}
          <Link
            to="/student"
            className="flex-1 max-w-sm border rounded-lg p-6 hover:border-purple-500 hover:border-4 transition"
          >
            <h2 className="text-lg font-semibold mb-2">I’m a Student</h2>
            <p className="text-gray-500">
              Participate in polls and share your input in real-time.
            </p>
          </Link>

          {/*  Teacher Page link */}
          <Link
            to="/teacher"
            className="flex-1 max-w-sm border rounded-lg p-6 hover:border-purple-500 hover:border-4 transition"
          >
            <h2 className="text-lg font-semibold mb-2">I’m a Teacher</h2>
            <p className="text-gray-500">
              Create and manage polls for students with ease.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
