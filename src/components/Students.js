import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ stname: '',lstname: '',conperson: '', connumber: '',email: '',dob: new Date(),age:0,classroom:''});
  const [classrooms, setClass] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchClass();
  }, []);

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

  const createStudent = async (event) => {
    event.preventDefault();
    try {
      if(newStudent.stname!=='' && newStudent.lstname!=='' && newStudent.conperson!=='' && newStudent.connumber!=='' && newStudent.email!=='' && selectedClass!=='' && newStudent.dob!==''){
        await axios.post('https://localhost:7046/api/Student/AddStudent', { stname: newStudent.stname,lstname: newStudent.lstname,conperson: newStudent.conperson, connumber: newStudent.connumber,email: newStudent.email,dob:newStudent.dob,age:newStudent.age,classroom:selectedClass});
        setNewStudent({ stname: newStudent.stname,lstname: newStudent.lstname,conperson: newStudent.conperson, connumber: newStudent.connumber,email: newStudent.email,dob:newStudent.dob,age:newStudent.age,classroom:selectedClass});
        fetchStudents();
      }else{
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '200px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '4px',
    },
  };

  return (
    <div className="student-management-system">
      <h1>Student Records</h1>
      <form>
        <div className="student-form">
            <div className="dropdown-container">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newStudent.stname}
                  onChange={(e) => setNewStudent({ ...newStudent, stname: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newStudent.lstname}
                  onChange={(e) => setNewStudent({ ...newStudent, lstname: e.target.value })}
                  required
                />
                <div className="dropdown-wrapper">
                  <select required className="select-style" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                      <option value="">Choose a Class</option>
                      {classrooms.map((classroom) => (
                          <option key={classroom.id} value={classroom.clsname}>
                          {classroom.clsname}
                          </option>
                      ))}
                  </select>
                </div> 
                <input
                type="text"
                placeholder="Contact Person "
                value={newStudent.conperson}
                onChange={(e) => setNewStudent({ ...newStudent, conperson: e.target.value })}
                required
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={newStudent.connumber}
                  onChange={(e) => {
                    const inputVal = e.target.value;
                    const numbersOnly = /^\d*$/; // Regex pattern to match numbers only

                    if (numbersOnly.test(inputVal) && inputVal.length <= 10) {
                      setNewStudent({ ...newStudent, connumber: inputVal });
                    }
                  }}
                  required
                />
                <input
                type="text"
                placeholder="Email Address"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                required
                />
                <input
                type="date"
                placeholder="Date of Birth"
                value={newStudent.dob}
                onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                required
                />
            </div>
            <button onClick={(event) => createStudent(event)}>Create</button>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Error Modal"
              style={modalStyles}
            >
              <h2 className="modal-title">Error</h2>
              <p className="modal-message">Please fill in all the required fields.</p>
              <button className="modal-button" onClick={closeModal}>OK</button>
            </Modal>
        </div>
      </form>

    <div>
      <div className="title">Curent Students</div>
    </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Person</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              {/* <th scope="row">{student.id} </th>
              <td>{student.stname}</td>
              <td>{student.course}</td> */}
              <td>{student.stname}</td>
              <td>{student.lstname}</td>
              <td>{student.conperson}</td>
              <td>{student.connumber}</td>
              <td>
                <button onClick={() => deleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;