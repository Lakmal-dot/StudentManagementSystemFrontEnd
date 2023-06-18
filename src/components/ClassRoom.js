import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.scss';
import Modal from 'react-modal';

const ClassRoom = () => {
  const [classrooms, setClass] = useState([]);
  const [newClassroom, setNewClass] = useState({ clsname: ''});
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const result = await axios.get("https://localhost:7046/api/ClasRoom/GetClass");
      setClass(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching Classes:', error);
    }
  };

  const createClass = async (event) => {
    event.preventDefault();
    try {
      if(newClassroom.clsname!==''){
        await axios.post('https://localhost:7046/api/ClasRoom/AddClass', { clsname: newClassroom.clsname});
        setNewClass({ clsname: newClassroom.clsname});
        fetchClasses();
     }else{
      setIsModalOpen(true);
    }
    } catch (error) {
      console.error('Error creating Class:', error);
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

  const updateClass = async (id, updatedData) => {
    try {
      await axios.put(`https://localhost:7046/api/ClasRoom/UpdateClass/${id}`, updatedData);
      fetchClasses();
    } catch (error) {
      console.error('Error updating Class:', error);
    }
  };

  const DeleteClass = async (id) => {
    try {
      await axios.delete(`https://localhost:7046/api/ClasRoom/DeleteClass/${id}`);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting Class:', error);
    }
  };

  return (
    <div className="student-management-system">
      <h1>Class Records</h1>
      <form>
        <div className="student-form">
            <input
            type="text"
            placeholder="Class Name "
            value={newClassroom.clsname}
            onChange={(e) => setNewClass({ ...newClassroom, clsname: e.target.value })}
            required
            />
            <button onClick={(event) => createClass(event)}>Add Class</button>
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
      <div className="title">Curent Classes</div>
    </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Class Name</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom.id}>
              {/* <th scope="row">{student.id} </th>
              <td>{student.stname}</td>
              <td>{student.course}</td> */}
              <td>{classroom.clsname}</td>
              <td>
                <button onClick={() => DeleteClass(classroom.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassRoom;