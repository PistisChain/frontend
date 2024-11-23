import React, { useState } from "react";
import "./attendance.css";
import axios from "axios";

function Attendance() {
  const [studentID, setStudentID] = useState("");
  const [password, setpassword] = useState("");
  const [evnetID, setEventID] = useState("");
  

  const handleTakeAttendance = async (e) => {
    
  };
  return (
    <div className="registration">
      <h2 className="registration-title">Student Registration</h2>
      <form className="registration-form">
        <div className="input-group">
          <label>Student ID:</label>
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <label>event ID:</label>
          <input
            type="text"
            value={evnetID}
            onChange={(e) => setEventID(e.target.value)}
          />
        <button className="button" onClick={handleTakeAttendance}>
        TakeAttendance
        </button>
      </form>
    </div>
  );
}

export default Attendance;


