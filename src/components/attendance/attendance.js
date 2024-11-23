import React, { useState } from "react";
import "./attendance.css";
import { message } from "antd";
import { Layout } from "antd";
import Status from '../status/status';
import axios from "axios";

function Attendance() {
  const port = sessionStorage.getItem('port')
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
      message.success("签到成功，正在等待挖矿确认");
      // alert("签到成功，正在等待挖矿确认");
  } catch (error) {
      console.error("签到失败", error);
      message.error(error.response?.data?.error)
      // alert("error.response.data.error");
  }
  };
  return (
    <Layout>
      <Status />
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
    </Layout>

    
  );
}

export default Attendance;


