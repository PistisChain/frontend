// Copyright 2024 yangsuyi
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { useState } from 'react';
import { Input, Button, Table } from 'antd';
import './AttendanceRecord.css';

const AttendanceRecord = () => {
  const [studentId, setStudentId] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  const handleQuery = async () => {
    // 模拟获取数据
    const mockData = [
      { key: '1', date: '2024-01-01', status: 'Present' },
      { key: '2', date: '2024-01-02', status: 'Absent' },
    ];
    setAttendanceData(mockData);
  };

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Attendence condition', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div className="attendance-record-container" style={{ padding: '20px' }}>
      <h2>Student Attendance Enquiry</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Input 
          placeholder="Please enter the student ID" 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
          style={{ width: '300px' }}
        />
        <Button type="primary" onClick={handleQuery}>
          query
        </Button>
      </div>
      <Table 
        dataSource={attendanceData} 
        columns={columns} 
        pagination={{ pageSize: 5 }} 
        bordered 
      />
    </div>
  );
};

export default AttendanceRecord;
