import React, { useEffect, useState } from 'react';
import './Achievements.css';

const Achievements = () => {
    const [achievements, setAchievements] = useState({
        finance: [],
        coding: [],
        languages: []
    });

    const token = localStorage.getItem('jwt_token'); // Retrieve the token from local storage

    useEffect(() => {
        // Initializing local achievements object
        const localAchievements = {
            finance: [],
            coding: [],
            languages: []
        };

        // Retrieve completed achievements from local storage
        const completedFinance = JSON.parse(localStorage.getItem('completedFinance') || '[]');
        const completedCoding = JSON.parse(localStorage.getItem('completedCoding') || '[]');
        const completedLanguages = JSON.parse(localStorage.getItem('completedLanguage') || '[]');

        // Finance achievements
        if (completedFinance.length >= 1) {
            localAchievements.finance.push({ title: '✅ First Finance Problem Completed!' });
        }
        if (completedFinance.length >= 5) {
            localAchievements.finance.push({ title: '🔥 Completed 5 Finance Problems!' });
        }

        // Coding achievements
        if (completedCoding.length >= 1) {
            localAchievements.coding.push({ title: '✅ First Coding Problem Completed!' });
        }
        if (completedCoding.length >= 5) {
            localAchievements.coding.push({ title: '🔥 Completed 5 Coding Problems!' });
        }

        // Language achievements
        if (completedLanguages.length >= 1) {
            localAchievements.languages.push({ title: '✅ First Language Lesson Completed!' });
        }
        if (completedLanguages.length >= 5) {
            localAchievements.languages.push({ title: '🔥 Completed 5 Language Lessons!' });
        }

        // Update achievements state
        console.log('Completed Finance:', completedFinance);
        console.log('Completed Coding:', completedCoding);
        console.log('Completed Languages:', completedLanguages);
        
        setAchievements(localAchievements);
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
