import React, { useEffect, useState } from 'react';
import './Achievements.css';
import axios from 'axios';

const Achievements = () => {
    const [achievements, setAchievements] = useState({
        finance: [],
        coding: [],
        languages: []
    });

    useEffect(() => {
        const fetchAchievements = async () => {
            const token = localStorage.getItem('token');
            console.log('JWT Token:', token); // Debugging log

            if (!token) {
                console.error('JWT token is missing');
                return;
            }
            try {
                const response = await axios.get('http://localhost:4000/api/user/achievements', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Response:', response.data); // Debugging log

                setAchievements({
                    finance: response.data.finance || [],
                    coding: response.data.coding || [],
                    languages: response.data.languages || []
                });
            } catch (error) {
                console.error('Error fetching achievements:', error);
            };
        }
        fetchAchievements();
    }, []);

    // Helper function to display only the first achievement if there are more than 1, and a message if more than 5
    const renderAchievements = (category) => {
        if (category.length > 5) {
            return <p>✅ You have completed all questions!</p>;
        } else if (category.length > 1) {
            return <p>{category[0].title}</p>;
        } else if (category.length > 0) {
            return <ul>
                {category.map((ach, index) => (
                    <li key={index}>{ach.title}</li>
                ))}
            </ul>;
        } else {
            return <p>You have no achievements! Get started on the lessons.</p>;
        }
    };

    return (
        <div className="achievements-container">
            <h1>Achievements</h1>

            <div className="achievements-boxes">
                <div className="abox-one">
                    <h2>Finance</h2>
                    {renderAchievements(achievements.finance)}
                </div>

                <div className="abox-two">
                    <h2>Coding</h2>
                    {renderAchievements(achievements.coding)}
                </div>

                <div className="abox-three">
                    <h2>Languages</h2>
                    {renderAchievements(achievements.languages)}
                </div>
            </div>
        </div>
    );
};

export default Achievements;
