import React, { useState, useEffect } from 'react';
import { Input, Button, Table, DatePicker, Select, message } from 'antd';
import axios from 'axios';
import './AttendanceRecord.css';

const { RangePicker } = DatePicker;

const AttendanceRecord = () => {
  const [studentId, setStudentId] = useState('');
  const [eventId, seteventId] = useState(''); // 用于 class 和 course 查询
  const [dateRange, setDateRange] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [queryMode, setQueryMode] = useState('student'); // student 或 class

  // 查询数据
  const handleQuery = async () => {
    try {
      let response;
  
      // 格式化时间范围
      const [startDate, endDate] = dateRange;
      const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : undefined;
      const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : undefined;
  
      // 根据查询模式调用不同的 API
      if (queryMode === 'student') {
        response = await axios.get('http://localhost:3001/api/attendance/student', {
          params: {
            studentId: studentId || undefined,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
        });
      } else if (queryMode === 'class') {
        response = await axios.get('http://localhost:3001/api/attendance/course', {
          params: {
            eventId: eventId || undefined,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
        });
      }
  
      // 处理返回数据
      const data = response.data.map((item, index) => ({
        key: index.toString(),
        ...item,
      }));
  
      setAttendanceData(data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      message.error('Failed to fetch attendance data. Please try again.');
    }
  };

  // 页面加载时默认加载全部数据
  useEffect(() => {
    handleQuery();
  }, [queryMode]); // 根据查询模式变化重新加载数据

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
          style={{ width: '200px' }}
        >
          <Select.Option value="student">Query by Student</Select.Option>
          <Select.Option value="class">Query by Class</Select.Option>
        </Select>

        {queryMode === 'student' && (
          <Input
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{ width: '200px' }}
          />
        )}

        {queryMode === 'class' && (
          <Input
            placeholder="Enter Class ID"
            value={eventId}
            onChange={(e) => seteventId(e.target.value)}
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
