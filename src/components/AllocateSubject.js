import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import './styles.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Modal from 'react-modal';

const AllocateSubject = () => {
  const [allocatesubject, setAllocateSubject] = useState([]);
  const [newallocateSubject, setNewAllocateSubject] = useState({ teacher: '',subject: ''});
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllocateSubject();
    fetchTeachers();
    fetchSubjects();
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

  const fetchSubjects = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/Subject/GetSubject");
      setSubjects(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchAllocateSubject = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/AllocateSubject/GetAllocateSubject");
      setAllocateSubject(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching Allocated Subjects:', error);
    }
  };

  const createAllocateSubject = async (event) => {
    event.preventDefault();
    try {
      if(selectedTeacher!=='' && selectedSubject!==''){
        await axios.post('https://localhost:7046/api/AllocateSubject/AddAllocateSubject', { teacher: selectedTeacher,subject: selectedSubject});
        setNewAllocateSubject({ teacher: selectedTeacher,subject: selectedSubject});
        fetchAllocateSubject();
     }else{
      setIsModalOpen(true);
    }
    } catch (error) {
      console.error('Error in Subject Allocation:', error);
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

  const UpdateAllocateSubject = async (id, updatedData) => {
    try {
      await axios.put(`https://localhost:7046/api/AllocateSubject/UpdateAllocateSubject/${id}`, updatedData);
      fetchAllocateSubject();
    } catch (error) {
      console.error('Error updating Allocation Subject:', error);
    }
  };

  const DeleteAllocateSubject = async (id) => {
    try {
      await axios.delete(`https://localhost:7046/api/AllocateSubject/DeleteAllocateSubject/${id}`);
      fetchAllocateSubject();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div className="student-management-system">
      <h1>Subject Allocation</h1>
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
                    <select required className="select-style" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        <option value="">Choose a subject</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.subjectname}>
                            {subject.subjectname}
                            </option>
                        ))}
                    </select>
                </div> 
                <button onClick={(event) => createAllocateSubject(event)}>Allocate Subject</button>  
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
      <div className="title">Curent Subject Allocations</div>
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
              <td>
                <button onClick={() => DeleteAllocateSubject(allocatesubject.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllocateSubject;