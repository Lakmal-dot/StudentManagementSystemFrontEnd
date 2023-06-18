import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ stname: '',lstname: '',conperson: '', connumber: '',email: '',dob: '',age:0,classroom:'null'});
  const [allocatesubject, setAllocateSubject] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentData, setStudentData] = useState({});
  const [classrooms, setClass] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  
  

  useEffect(() => {
    fetchStudents();
    fetchAllocateSubject();
    fetchClass();
  }, []);

  const fetchAllocateSubject = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/AllocateSubject/GetAllocateSubject");
      setAllocateSubject(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching Allocated Subjects:', error);
    }
  };

  const fetchClass = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/ClasRoom/GetClass");
      setClass(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching Classes:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/Student/GetStudent");
      setStudents(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentData(selectedStudent);
    } else {
      // Reset the studentData object if no student is selected
      setStudentData({});
    }
  }, [selectedStudent]);

  const fetchStudentData = async (studentId) => {
    try {
      const response = await axios.get(`https://localhost:7046/api/Student/GetSelectedStudent?id=${studentId}`);
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const createStudent = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://localhost:7046/api/Student/AddStudent', { stname: newStudent.stname,lstname: newStudent.lstname,conperson: newStudent.conperson, connumber: newStudent.connumber,email: newStudent.email,dob:newStudent.dob,age:newStudent.age,classroom:newStudent.classroom});
      setNewStudent({ stname: newStudent.stname,lstname: newStudent.lstname,conperson: newStudent.conperson, connumber: newStudent.connumber,email: newStudent.email,dob:newStudent.dob,age:newStudent.age,classroom:newStudent.classroom});
      fetchStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const updateStudent = async (id, updatedData) => {
    try {
      await axios.put(`https://localhost:7046/api/Student/UpdateStudent/${id}`, updatedData);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://localhost:7046/api/Student/DeleteStudent/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Event handler for the select dropdown
  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  return (
    <div className="student-management-system">
      <h1>Students Records</h1>
      <form>
        <div className="student-form">
            <div className="dropdown-container">
                <div className="dropdown-wrapper">  
                    <select className="select-style" value={selectedStudent} onChange={handleStudentChange}>
                        <option value="">Choose a student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                            {student.stname}
                            </option>
                        ))}
                    </select>
                </div>
                <input
                type="text"
                placeholder="Classroom"
                value={studentData.classroom}
                onChange={(e) => setNewStudent({ ...newStudent, classroom: e.target.value })}
                />
                <input
                type="text"
                placeholder="Contact Person "
                value={studentData.conperson}
                onChange={(e) => setNewStudent({ ...newStudent, conperson: e.target.value })}
                />
                <input
                type="number"
                placeholder="Contact Number"
                value={studentData.connumber}
                onChange={(e) => setNewStudent({ ...newStudent, connumber: e.target.value })}
                />
                <input
                type="text"
                placeholder="Email Address"
                value={studentData.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
                <input
                type="text"
                placeholder="Date of Birth"
                value={studentData.dob}
                onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                />
                <input
                type="text"
                placeholder="Age"
                value={studentData.age}
                onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                />
            </div>
        </div>
      </form>

    <div>
      <div className="title">Teachers Records</div>
    </div>

    <table className="student-table">
        <thead>
          <tr>
            <th>Teachers' Name</th>
            <th>Subject Name</th>
          </tr>
        </thead>
        <tbody>
          {allocatesubject.map((allocatesubject) => (
            <tr key={allocatesubject.id}>
              {/* <th scope="row">{student.id} </th>
              <td>{student.stname}</td>
              <td>{student.course}</td> */}
              <td>{allocatesubject.teacher}</td>
              <td>{allocatesubject.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;