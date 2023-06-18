import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ fstname: '',lstname: '',connumber: '', email: ''});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/Teacher/GetTeacher");
      setTeachers(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const createTeacher = async (event) => {
    event.preventDefault();
    try {
      if(newTeacher.fstname!=='' && newTeacher.lstname && newTeacher.connumber!=='' && newTeacher.email){
        await axios.post('https://localhost:7046/api/Teacher/AddTeacher', { fstname: newTeacher.fstname,lstname: newTeacher.lstname,connumber: newTeacher.connumber, email: newTeacher.email});
        setNewTeacher({ fstname: newTeacher.fstname,lstname: newTeacher.lstname,connumber: newTeacher.connumber, email: newTeacher.email});
        fetchTeachers();
      }else{
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error creating teachers:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const UpdateTeacher = async (id, updatedData) => {
    try {
      await axios.put(`https://localhost:7046/api/Teacher/UpdateTeacher/${id}`, updatedData);
      fetchTeachers();
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const DeleteTeacher = async (id) => {
    try {
      await axios.delete(`https://localhost:7046/api/Teacher/DeleteTeacher/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div className="student-management-system">
      <h1>Teachers Records</h1>
      <form>
        <div className="student-form">
            <input
            type="text"
            placeholder="First Name "
            value={newTeacher.fstname}
            onChange={(e) => setNewTeacher({ ...newTeacher, fstname: e.target.value })}
            required
            />
            <input
            type="text"
            placeholder="Last Name "
            value={newTeacher.lstname}
            onChange={(e) => setNewTeacher({ ...newTeacher, lstname: e.target.value })}
            required
            />
            <input
              type="text"
              placeholder="Contact Number"
              value={newTeacher.connumber}
              onChange={(e) => {
                const inputVal = e.target.value;
                const numbersOnly = /^\d*$/; // Regex pattern to match numbers only

                if (numbersOnly.test(inputVal) && inputVal.length <= 10) {
                  setNewTeacher({ ...newTeacher, connumber: inputVal });
                }
              }}
              required
            />
            <input
            type="text"
            placeholder="Email"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
            required
            />

            <button onClick={(event) => createTeacher(event)}>Add Teacher</button>
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
      <div className="title">Curent Teachers</div>
    </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              {/* <th scope="row">{student.id} </th>
              <td>{student.stname}</td>
              <td>{student.course}</td> */}
              <td>{teacher.fstname}</td>
              <td>{teacher.lstname}</td>
              <td>{teacher.connumber}</td>
              <td>{teacher.email}</td>
              <td>
                <button onClick={() => DeleteTeacher(teacher.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;