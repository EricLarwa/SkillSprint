import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './UserLogin/LoginSignup';
import Navbar from './components/Navbar';
import Dashboard from './landing/Dashboard';
import LanguageHome from './language/LanguageHome';
import FinanceHome from './finance/FinanceHome';
import CodingHome from './coding/coding-home';
import React from 'react';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard" element={<>
            <Navbar />
            <Dashboard />
          </>} />
          <Route path="/coding" element={
            <>
              <Navbar />
              <CodingHome />
            </>
          }/>
          <Route path="/language" element={
            <>
              <Navbar />
              <LanguageHome />
            </>
          }/>
          <Route path="/finance" element={
            <>
              <Navbar />
              <FinanceHome />
            </>
          }/>
        </Routes>
    </Router>
  );
}

export default App;
