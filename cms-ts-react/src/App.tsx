import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import AddCourse from './components/addcourses';

function App() {
  return (
    <div>
      {/* Render the Header Component */}
      <Header title="Course Management" msg="Welcoem to data"></Header>
      <Header title="User Management"></Header>
      <AddCourse></AddCourse>
    </div>
    
  );
}

export default App;
