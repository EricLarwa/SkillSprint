import React from 'react'
import './Achievements.css'
// get the achievments from the backend here. 
const Achievements = () => {

    const [achievements, setAchievements] = useState({
        finance: [],
        coding: [],
        languages: []
    });

    const token = localStorage.getItem('jwt_token'); // Retrieve the token from local storage

    useEffect(() => {
        // Fetch achievements data from the backend
        axios.get('http://localhost:4000/api/achievements', {
            headers: {
                Authorization: `Bearer ${token}`  // Send JWT token in headers
            }
        })
        .then((response) => {
            // Assuming the response data is an array of achievements
            const achievementsData = response.data;
            const categorizedAchievements = {
                finance: [],
                coding: [],
                languages: []
            };

            // Categorizing achievements based on the title or category
            achievementsData.forEach((achievement) => {
                if (achievement.title.includes('Finance')) {
                    categorizedAchievements.finance.push(achievement);
                } else if (achievement.title.includes('Coding')) {
                    categorizedAchievements.coding.push(achievement);
                } else if (achievement.title.includes('Languages')) {
                    categorizedAchievements.languages.push(achievement);
                }
            });

            setAchievements(categorizedAchievements);
        })
        .catch((error) => {
            console.error('Error fetching achievements:', error);
        });
    }, [token]);

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
    )
}

export default Achievements;