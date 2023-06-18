import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import Modal from 'react-modal';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ subjectname: ''});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/Subject/GetSubject");
      setSubjects(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const createSubject = async (event) => {
    event.preventDefault();
    try {
      if(newSubject.subjectname !==''){
        await axios.post('https://localhost:7046/api/Subject/AddSubject', { subjectname: newSubject.subjectname});
        setNewSubject({ subjectname: newSubject.subjectname});
        fetchSubjects();
     }else{
      setIsModalOpen(true);
    }
    } catch (error) {
      console.error('Error creating subject:', error);
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

  const updateSubject = async (id, updatedData) => {
    try {
      await axios.put(`https://localhost:7046/api/Subject/UpdateSubject/${id}`, updatedData);
      fetchSubjects();
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  const DeleteSubject = async (id) => {
    try {
      await axios.delete(`https://localhost:7046/api/Subject/DeleteSubject/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  return (
    <div className="student-management-system">
      <h1>Subjects Records</h1>
      <form>
        <div className="student-form">
            <input
            type="text"
            placeholder="Subject Name "
            value={newSubject.subjectname}
            onChange={(e) => setNewSubject({ ...newSubject, subjectname: e.target.value })}
            required
            />
            <button onClick={(event) => createSubject(event)}>Add Subject</button>
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
      <div className="title">Curent Subjects</div>
    </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Subject Name</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              {/* <th scope="row">{student.id} </th>
              <td>{student.stname}</td>
              <td>{student.course}</td> */}
              <td>{subject.subjectname}</td>
              <td>
                <button onClick={() => DeleteSubject(subject.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subjects;