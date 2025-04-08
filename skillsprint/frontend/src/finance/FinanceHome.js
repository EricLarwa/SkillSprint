import React from 'react'
import { useNavigate } from 'react-router-dom';
import './FinanceHome.css';

const FinanceHome = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="container">
        <h1>Finance Lessons</h1>
        <p>Enhance your Finance abilities one step <br></br>at a time with quizzes and lessons</p>
        <button onClick={() => handleNavigation('/finance-problems')}>Get Started</button>
        </div>
    )
}

export default FinanceHome;