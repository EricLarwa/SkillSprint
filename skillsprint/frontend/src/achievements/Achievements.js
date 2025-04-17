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
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log('Response:', response); // Debugging log
                    if (!response.ok) {
                        console.error('Failed to fetch achievements:', response.status, response.statusText);
                        return;
                    }

                    const data = await response.json()
                    console.log('Response:', data)
    
                setAchievements(data);
            } catch (error) {
                console.error('Failed to fetch achievements:', error);
            }
        };
    
        fetchAchievements();
    }, []);

    return (
        <div className="achievements-container">
            <h1>Achievements</h1>

            <div className="achievements-boxes">
                <div className="abox-one">
                    <h2>Finance</h2>
                    {achievements.finance.length > 0 ? (
                        <ul>
                            {achievements.finance.map((ach, index) => (
                                <li key={index}>{ach.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no achievements! Get started on the finance lessons.</p>
                    )}
                </div>

                <div className="abox-two">
                    <h2>Coding</h2>
                    {achievements.coding.length > 0 ? (
                        <ul>
                            {achievements.coding.map((ach, index) => (
                                <li key={index}>{ach.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no achievements! Get started on the coding lessons.</p>
                    )}
                </div>

                <div className="abox-three">
                    <h2>Languages</h2>
                    {achievements.languages.length > 0 ? (
                        <ul>
                            {achievements.languages.map((ach, index) => (
                                <li key={index}>{ach.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no achievements! Get started on the language lessons.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Achievements;
