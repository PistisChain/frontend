import React, { useState } from "react";
import "./attendance.css";
import axios from "axios";
const port = sessionStorage.getItem('port')

function Attendance() {
  const [evnetID, setEventID] = useState("");
  

  const handleTakeAttendance = async (e) => {
    e.preventDefault();
    try {
        await axios.post(
          `http://localhost:${port}/operator/attendance`,
          {
              studentId: sessionStorage.getItem('studentId'),
              password: sessionStorage.getItem('password'),
              walletId: sessionStorage.getItem('walletId'),
              address: sessionStorage.getItem('address'),
              eventId: evnetID,
          }
      );
      alert("签到成功，正在等待挖矿确认");
  } catch (error) {
      console.error("签到失败", error);
      alert("error.response.data.error");
  }
  };
  return (
    <div className="registration">
      <h2 className="registration-title">Student Attendance</h2>
      <form className="registration-form">
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


