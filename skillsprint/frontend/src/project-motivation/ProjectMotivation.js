import React from 'react'
import { useNavigate } from 'react-router-dom';
import './ProjectMotivation.css';

const ProjectMotivation = () => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="project-container">
            <h1>Project Motivation</h1>

            <div className="project-boxes">
                <div className="projectbox-one">
                    <h2>Why?</h2>
                    <p>With SkillSpring, we created to address a growing need for accessible, engaging, and
effective learning solutions in today’s fast-paced, skill driven world. This platform is designed to
empower individuals who seek to master essential skills such as coding, finance, and language
learning, that are critical for personal and professional success. </p>
                </div>
                <div className="projectbox-two">
                    <h2>What?</h2>
                    <p> SkillSpring is an innovative web application designed to make learning core skills in
coding, finance, and language both engaging and effective. Through short, interactive lessons,
SkillSpring helps users master fundamental concepts in computer science, personal finance
(such as budgeting and investment strategies), and language learning.
The platform combines simple articles, curated resources, and interactive lessons to create a
comprehensive learning experience. What sets SkillSpring apart is its gamified
approach—users can earn achievements and rewards as they progress, making learning fun
and motivating. </p>
                </div>
            </div>
        </div>
    )
}

export default ProjectMotivation;