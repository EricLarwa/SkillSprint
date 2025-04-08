import React from 'react'
import { useNavigate } from 'react-router-dom';
import './LanguageHome.css';

const LanguageHome = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="dash-container">
        <h1 className="keep-header">Language Lessons</h1>
        <p className="keep-p">Enhance your language abilities one step <br></br>at a time with quizzes and lessons</p>
        <button className="keep-button" onClick={() => handleNavigation('/language-problems')}>Get Started</button>
        </div>
    )
}

export default LanguageHome;