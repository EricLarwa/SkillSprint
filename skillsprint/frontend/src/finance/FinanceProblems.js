import React from 'react'
import { useNavigate } from 'react-router-dom';
import './FinanceProblems.css';

const FinanceProblems = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="finance-container">
            <h1>Finance</h1>
            <div className="intro-boxes">
                <div className="financebox-one">
                    <h2>Question:</h2>
                    <p>**NEED to get from SQLlite**</p>
                </div>
                <div className="financebox-two">
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

export default FinanceProblems;