import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import StudentPage from "./components/StudentPage";
import TeacherPage from "./components/TeacherPage";
import StudentPollPage from "./components/StudentPollPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student-poll" element={<StudentPollPage />} />
      </Routes>
    </Router>
  );
}

export default App;
