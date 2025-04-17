import React from 'react'
import './ProjectMotivation.css';

const ProjectMotivation = () => {

    return (
        <div className="project-container">
            <h1>Project Motivation</h1>

            <div className="project-boxes">
                <div className="projectbox-one">
                    <h2>Why?</h2>
                    <p>With SkillSprint, we created to address a growing need for accessible, engaging, and
effective learning solutions in today’s fast-paced, skill driven world. This platform is designed to
empower individuals who seek to master essential skills such as coding, finance, and language
learning, that are critical for personal and professional success. </p>
                </div>
                <div className="projectbox-two">
                    <h2>What?</h2>
                    <p> SkillSprint is a web application that offers engaging and effective learning in coding, finance, and language through short, interactive lessons. It features a mix of articles, curated resources, and gamified elements, allowing users to earn achievements and rewards as they progress. This approach makes mastering fundamental concepts in computer science, personal finance, and language learning enjoyable and motivating. </p>
                </div>
            </div>
        </div>
    )
}

export default ProjectMotivation;