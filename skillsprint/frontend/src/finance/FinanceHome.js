import React from 'react'
import { useNavigate } from 'react-router-dom';
import './FinanceHome.css';

const FinanceHome = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="dash-container">
        <h1 className="keep-header">Finance Lessons</h1>
        <p className="keep-p">Enhance your finance abilities one step <br></br>at a time with quizzes and lessons</p>
        <button className="keep-button" onClick={() => handleNavigation('/coding-problems')}>Get Started</button>
        </div>
    )
}

export default FinanceHome;