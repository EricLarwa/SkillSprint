import React from 'react'
import { useNavigate } from 'react-router-dom';
import './coding-home.css';

const CodingHome = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="dash-container">
        <h1 className="keep-header">Coding Lessons</h1>
        <p className="keep-p">Enhance your coding abilities one step <br></br>at a time with quizzes and lessons</p>
        <button className="keep-button" onClick={() => handleNavigation('/coding-problems')}>Get Started</button>
        </div>
    )
}

export default CodingHome;