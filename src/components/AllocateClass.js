import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import './styles.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Modal from 'react-modal';

const AllocateClass = () => {
  const [allocateclass, setAllocateClass] = useState([]);
  const [newallocateClass, setNewAllocateClass] = useState({ teacher: '',classroom: ''});
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClass] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllocateClass();
    fetchTeachers();
    fetchClass();
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

  const fetchClass = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/ClasRoom/GetClass");
      setClass(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching Classes:', error);
    }
  };

  const fetchAllocateClass = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/AllocateClass/GetAllocateClass");
      setAllocateClass(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching Allocated Classes:', error);
    }
  };

  const createAllocateClass = async (event) => {
    event.preventDefault();
    try {
      if(selectedTeacher!=='' && selectedClass!==''){
        await axios.post('https://localhost:7046/api/AllocateClass/AddAllocateClass', { teacher: selectedTeacher,classroom: selectedClass});
        setNewAllocateClass({ teacher: selectedTeacher,classroom: selectedClass});
        fetchAllocateClass();
     }else{
      setIsModalOpen(true);
    }
    } catch (error) {
      console.error('Error in Class Allocation:', error);
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

  const UpdateAllocateClass = async (id, updatedData) => {
    try {
      await axios.put(`https://localhost:7046/api/AllocateClass/UpdateAllocateClass/${id}`, updatedData);
      fetchAllocateClass();
    } catch (error) {
      console.error('Error updating Allocation Class:', error);
    }
  };

  const DeleteAllocateClass = async (id) => {
    try {
      await axios.delete(`https://localhost:7046/api/AllocateClass/DeleteAllocateClass/${id}`);
      fetchAllocateClass();
    } catch (error) {
      console.error('Error deleting Allocated Class:', error);
    }
  };

  return (
    <div className="student-management-system">
      <h1>Class Allocation</h1>
      <form>
        <div className="student-form">
          <div className="dropdown-container">
              <div className="dropdown-wrapper">
                  <select required className="select-style" value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                      <option value="">select a Teacher</option>
                      {teachers.map((teacher) => (
                          <option key={teacher.id} value={teacher.fstname}>
                          {teacher.fstname}
                          </option>
                      ))}
                  </select>
              </div>

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
              <button onClick={(event) => createAllocateClass(event)}>Allocate Class</button>
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
        </div>
      </form>

    <div>
      <div className="title">Curent Class Allocations</div>
    </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Teachers' Name</th>
            <th>Class Name</th>
          </tr>
        </thead>
        <tbody>
          {allocateclass.map((allocateclass) => (
            <tr key={allocateclass.id}>
              {/* <th scope="row">{student.id} </th>
              <td>{student.stname}</td>
              <td>{student.course}</td> */}
              <td>{allocateclass.teacher}</td>
              <td>{allocateclass.classroom}</td>
              <td>
                <button onClick={() => DeleteAllocateClass(allocateclass.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllocateClass;