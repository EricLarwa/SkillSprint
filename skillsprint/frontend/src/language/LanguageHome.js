import React from 'react'
import { useNavigate } from 'react-router-dom';
import './LanguageHome.css';

const LanguageHome = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="container">
        <h1>Language Lessons</h1>
        <p>Enhance your language abilities one step <br></br>at a time with quizzes and lessons</p>
        <button onClick={() => handleNavigation('/language-problems')}>Get Started</button>
        </div>
    )
}

export default LanguageHome;