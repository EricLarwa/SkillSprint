import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import Profile from "../img/profile.png";
import './Navbar.css';


const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const navigate = useNavigate();
    
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsNavOpen(false); // Close the mobile menu after navigation
    };

    const handleSettings = () => {
        navigate('/settings');
    }

    const handleProfile = () => {
        navigate('/profile');
    }

    return (
        < div className="navbar">
            <div className="menu" onClick={toggleNav}>
                <div className={`line ${isNavOpen ? 'open' : ''}`}></div>
                <div className={`line ${isNavOpen ? 'open' : ''}`}></div>
                <div className={`line ${isNavOpen ? 'open' : ''}`}></div>
            </div>
            <div className="navbar-links">  
                <img src={Profile} onClick={handleProfile} />
            </div>

            <div className={`nav-links ${isNavOpen ? 'open' : ''}`}>
                <button onClick={() => handleNavigation("/dashboard")}>Introduction</button>
                <button onClick={() => handleNavigation("/project-motivation")}>Project Motivation</button>
                <button onClick={() => handleNavigation("/coding")}>Coding Lessons</button>
                <button onClick={() => handleNavigation("/finance")}>Finance Lessons</button>
                <button onClick={() => handleNavigation("/business")}>Business Lessons</button>
                <button onClick={() => handleNavigation("/achievments")}>Achievments</button>
            </div>
        </div>
    ) 

}

export default Navbar;

    

