import React from 'react'
import './Dashboard.css'

const Dashboard = () => {

    return (
        <div className="dashboard-container">
            <h1>Introductions</h1>

            <div className="intro-boxes">
                <div className="box-one">
                    <h2>Eric</h2>
                    <p> Content </p>
                </div>
                <div className="box-two">
                    <h2>Jordan</h2>
                    <p> Content </p>
                </div>
                <div className="box-three">
                    <h2>Ricardo</h2>
                    <p> Content </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;