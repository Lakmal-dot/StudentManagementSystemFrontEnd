import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import StudentPage from './Students'
import TeacherPage from './Teachers'
import SubjagePage from './Subject'
import AllocateSubject from './AllocateSubject';
import ClassRoomPage from './ClassRoom';
import AllocateClass from './AllocateClass';
import StudentDetails from './StudentDetails';
import { useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const HomePage = () => {
    const navigate = useNavigate();
    const history = createBrowserHistory();

    const handleLogout = () => {
        // Perform logout logic here
        // For example, clearing authentication tokens, resetting user state, etc.
        // Then navigate back to the login page
        navigate('/');
        };

    return (
        <div>
        <h1 className='title'>Welcome to the Student Management System</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        <Tabs>
            <TabList>
            <Tab>Students</Tab>
            <Tab>Teachers</Tab>
            <Tab>Subjects</Tab>
            <Tab>Allocate Subject</Tab>
            <Tab>Classes</Tab>
            <Tab>Allocate Class</Tab>
            <Tab>Student Details</Tab>
            </TabList>

            <TabPanel>
                <StudentPage></StudentPage>
            </TabPanel>

            <TabPanel>
            <TeacherPage></TeacherPage>
            </TabPanel>

            <TabPanel>
            <SubjagePage></SubjagePage>
            </TabPanel>

            <TabPanel>
            <AllocateSubject></AllocateSubject>
            </TabPanel>

            <TabPanel>
            <ClassRoomPage></ClassRoomPage>
            </TabPanel>

            <TabPanel>
            <AllocateClass></AllocateClass>
            </TabPanel>

            <TabPanel>
            <StudentDetails></StudentDetails>
            </TabPanel>
        </Tabs>
        </div>
    );
};

export default HomePage;