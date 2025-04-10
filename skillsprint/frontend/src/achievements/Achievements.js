import React from 'react'
import './Achievements.css'
// get the achievments from the backend here. 
const Achievements = () => {

    return (
        <div className="achievements-container">
            <h1>Achievements</h1>

            <div className="achievements-boxes">
                <div className="abox-one">
                    <h2>Finance</h2>
                    <p> You have no achievements! Get started on the finance lessons </p>
                </div>
                <div className="abox-two">
                    <h2>Coding</h2>
                    <p> You have no achievements! Get started on the coding lessons  </p>
                </div>
                <div className="abox-three">
                    <h2>Languages</h2>
                    <p> You have no achievements! Get started on the language lessons  </p>
                </div>
            </div>
        </div>
    )
}

export default Achievements;