import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './UserLogin/LoginSignup';
import React from 'react';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/main" element={<LoginSignup />} />
        </Routes>
    </Router>
  );
}

export default App;
