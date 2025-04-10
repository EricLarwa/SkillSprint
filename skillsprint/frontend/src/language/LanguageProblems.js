import React from 'react'
import { useNavigate } from 'react-router-dom';
import './LanguageProblems.css';

const LanguageProblems = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="language-container">
            <h1>Language</h1>
            <div className="intro-boxes">
                <div className="languagebox-one">
                    <h2>Question:</h2>
                    <p>**NEED to get from SQLlite**</p>
                </div>
                <div className="languagebox-two">
                    <h2>Answer Choices</h2>
                    <p>**Get from SQLlite**</p>
                    <input type='radio'></input>
                    <label>Answer 1</label><br></br>
                    <input type='radio'></input>
                    <label>Answer 2</label><br></br>
                    <input type='radio'></input>
                    <label>Answer 3</label><br></br>

                </div>
        </div>
        </div>
    )
}

export default LanguageProblems;