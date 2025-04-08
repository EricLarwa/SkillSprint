import React from 'react'
import { useNavigate } from 'react-router-dom';
import './coding-home.css';

const CodingHome = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="container">
        <h1>Coding Lessons</h1>
        <p>Enhance your coding abilities one step <br></br>at a time with quizzes and lessons</p>
        <button onClick={() => handleNavigation('/coding-problems')}>Get Started</button>
        </div>
    )
}

export default CodingHome;