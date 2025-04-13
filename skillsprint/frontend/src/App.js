import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './UserLogin/LoginSignup';
import Navbar from './components/Navbar';
import Dashboard from './landing/Dashboard';
import LanguageHome from './language/LanguageHome';
import FinanceHome from './finance/FinanceHome';
import CodingHome from './coding/coding-home';
import React from 'react';
import LanguageProblems from './language/LanguageProblems';
import Achievements from './achievements/Achievements';
import FinanceProblems from './finance/FinanceProblems';
import ProjectMotivation from './project-motivation/ProjectMotivation';
import CodeSandbox from './coding/CodeSandbox';

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
          <Route path="/language-problems" element={
            <>
              <Navbar />
              <LanguageProblems />
            </>
          }/>
          <Route path="/achievments" element={
            <>
              <Navbar />
              <Achievements/>
            </>
          }/>
          <Route path="/finance-problems" element={
            <>
              <Navbar />
              <FinanceProblems />
            </>
          }/>
          <Route path="/project-motivation" element={
            <>
              <Navbar />
              <ProjectMotivation />
            </>
          }/>
          <Route path="/coding-problems" element={
            <>
              <Navbar />
              <CodeSandbox />
            </>
          }/>
        </Routes>
    </Router>
  );
}

export default App;
