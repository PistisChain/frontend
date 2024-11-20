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
import { Input, Button, Table, DatePicker, Select } from 'antd';
import './AttendanceRecord.css';

const { RangePicker } = DatePicker;

const AttendanceRecord = () => {
  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [queryMode, setQueryMode] = useState('student'); // student or class

  const handleQuery = async () => {
    const mockStudentData = [
      { key: '1', date: '2024-01-01', status: 'Present' },
      { key: '2', date: '2024-01-02', status: 'Absent' },
    ];

    const mockClassData = [
      { key: '1', studentId: 'S001', name: 'John', date: '2024-01-01', status: 'Present' },
      { key: '2', studentId: 'S002', name: 'Jane', date: '2024-01-01', status: 'Absent' },
    ];

    // 根据查询模式获取不同的数据
    if (queryMode === 'student') {
      setAttendanceData(mockStudentData);
    } else if (queryMode === 'class') {
      setAttendanceData(mockClassData);
    }
  };

  const studentColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Attendance Condition', dataIndex: 'status', key: 'status' },
  ];

  const classColumns = [
    { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Attendance Condition', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div className="attendance-record-container">
      <h2>Attendance Query System</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Select
          value={queryMode}
          onChange={setQueryMode}
          style={{ width: '150px' }}
        >
          <Select.Option value="student">Query by Student</Select.Option>
          <Select.Option value="class">Query by Class</Select.Option>
        </Select>

        {queryMode === 'student' ? (
          <Input
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{ width: '200px' }}
          />
        ) : (
          <Input
            placeholder="Enter Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            style={{ width: '200px' }}
          />
        )}

        <RangePicker
          onChange={(dates) => setDateRange(dates)}
          style={{ width: '300px' }}
        />

        <Button type="primary" onClick={handleQuery}>
          Query
        </Button>
      </div>

      <Table
        dataSource={attendanceData}
        columns={queryMode === 'student' ? studentColumns : classColumns}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};



export default AttendanceRecord;