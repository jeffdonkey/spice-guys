import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register'
// import ShowSpice from './components/ShowSpice';

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route  path="/" element = {<LandingPage/>}/>
          <Route  path="/login" element = {<Login/>}/>
          <Route  path="/register" element = {<Register/>}/>
          {/* <Route  path="/showspice" element = {<ShowSpice/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App