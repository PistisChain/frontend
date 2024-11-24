import React, { useState, useEffect } from 'react';
import { Input, Button, Table, DatePicker, Select, message } from 'antd';
import axios from 'axios';
import './query.css';
import { Layout } from "antd";
import Status from '../status/status';


const { RangePicker } = DatePicker;

const AttendanceRecord = () => {
  const [studentId, setStudentId] = useState('');
  const [eventId, setEventId] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [queryMode, setQueryMode] = useState('student'); // student 或 class
  const [granularity, setGranularity] = useState('day'); // 按天、周、月的粒度
  const [year, setYear] = useState(new Date().getFullYear()); // 默认年份
  const [weekRange, setWeekRange] = useState([1, 1]); // 周范围 [起始周, 结束周]
  const [monthRange, setMonthRange] = useState([1, 1]); // 月范围 [起始月, 结束月]
  const [dateRange, setDateRange] = useState([]); // 日期范围

  const handleQuery = async () => {
    try {
      let response;
      let params = { granularity };

      if (granularity === 'week' || granularity === 'month') {
        params = { ...params, year };
      }

      if (granularity === 'week') {
        const [startWeek, endWeek] = weekRange;
        params = { ...params, startWeek, endWeek };
      } else if (granularity === 'month') {
        const [startMonth, endMonth] = monthRange;
        params = { ...params, startMonth, endMonth };
      } else if (granularity === 'day' && dateRange.length > 0) {
        const [startDate, endDate] = dateRange;
        params = {
          ...params,
          startDate: startDate?.format('YYYY-MM-DD'),
          endDate: endDate?.format('YYYY-MM-DD')
        };
      }

      if (queryMode === 'student') {
        params = { ...params, studentId };
        response = await axios.get('http://localhost:2888/query/student', { params });
      } else if (queryMode === 'class') {
        params = { ...params, eventId };
        response = await axios.get('http://localhost:2888/query/course', { params });
      }

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

  useEffect(() => {
    handleQuery();
  }, [queryMode, granularity, weekRange, monthRange, year, dateRange]);

  const studentColumns = [
    { title: 'Date', dataIndex: 'dateTime', key: 'dateTime' },
    { title: 'Class ID', dataIndex: 'eventId', key: 'eventId' },
  ];

  const classColumns = [
    { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Date', dataIndex: 'dateTime', key: 'dateTime' },
  ];

  return (
    <Layout>
      <Status />
        <div className="attendance-record-container">
        <h2>Attendance Query </h2>
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
              onChange={(e) => setEventId(e.target.value)}
              style={{ width: '200px' }}
            />
          )}

          <Select
            value={granularity}
            onChange={setGranularity}
            style={{ width: '150px' }}
          >
            <Select.Option value="day">Daily</Select.Option>
            <Select.Option value="week">Weekly</Select.Option>
            <Select.Option value="month">Monthly</Select.Option>
          </Select>

          {(granularity === 'week' || granularity === 'month') && (
            <Select
              value={year}
              onChange={setYear}
              style={{ width: '150px' }}
            >
              {[...Array(5)].map((_, index) => (
                <Select.Option key={index + 1} value={2023 + index}>
                  {2023 + index}
                </Select.Option>
              ))}
            </Select>
          )}

          {granularity === 'week' && (
            <>
              <Select
                value={weekRange[0]}
                onChange={(value) => setWeekRange([value, weekRange[1]])}
                style={{ width: '150px' }}
              >
                {[...Array(52)].map((_, index) => (
                  <Select.Option key={index + 1} value={index + 1}>
                    Start Week {index + 1}
                  </Select.Option>
                ))}
              </Select>
              <Select
                value={weekRange[1]}
                onChange={(value) => setWeekRange([weekRange[0], value])}
                style={{ width: '150px' }}
              >
                {[...Array(52)].map((_, index) => (
                  <Select.Option key={index + 1} value={index + 1}>
                    End Week {index + 1}
                  </Select.Option>
                ))}
              </Select>
            </>
          )}

          {granularity === 'month' && (
            <>
              <Select
                value={monthRange[0]}
                onChange={(value) => setMonthRange([value, monthRange[1]])}
                style={{ width: '150px' }}
              >
                {[...Array(12)].map((_, index) => (
                  <Select.Option key={index + 1} value={index + 1}>
                    Start Month {index + 1}
                  </Select.Option>
                ))}
              </Select>
              <Select
                value={monthRange[1]}
                onChange={(value) => setMonthRange([monthRange[0], value])}
                style={{ width: '150px' }}
              >
                {[...Array(12)].map((_, index) => (
                  <Select.Option key={index + 1} value={index + 1}>
                    End Month {index + 1}
                  </Select.Option>
                ))}
              </Select>
            </>
          )}

          {granularity === 'day' && (
            <RangePicker
              onChange={(dates) => setDateRange(dates)}
              style={{ width: '300px' }}
            />
          )}

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
    </Layout>
  );
};

export default AttendanceRecord;
