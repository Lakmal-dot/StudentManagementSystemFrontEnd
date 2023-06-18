import React from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from "./components/LoginPage"
import StudentPage from "./components/Students"
import TeacherPage from "./components/Teachers"
import SubjectPage from "./components/Subject"
import AllocateSubjectPage from "./components/AllocateSubject"
import AllocateClassPage from "./components/AllocateClass"
import ClassRoomPage from "./components/ClassRoom"
import StudentRecordPage from "./components/StudentDetails"


function App() {
  return (
    <div>
      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/student" element={<StudentPage/>} />
        <Route path="/teacher" element={<TeacherPage/>} />
        <Route path="/subject" element={<SubjectPage/>} />
        <Route path="/allocatesubject" element={<AllocateSubjectPage/>} />
        <Route path="/class" element={<ClassRoomPage/>} />
        <Route path="/allocatesclass" element={<AllocateClassPage/>} />
        <Route path="/studentdetails" element={<StudentRecordPage/>} />
      </Routes>
    </div>
  );
}

export default App;
