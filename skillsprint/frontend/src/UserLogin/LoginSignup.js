import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

const LoginSignup = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [signupData, setSignupData] = useState({ email: "", password: ""})
    const [errors, setErrors] = useState({});
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setErrors({})
    }

    const handleInputChange = (event, formType) => {
        const { name, value } = event.target;
        if (formType === 'login') {
            setLoginData({ ...loginData, [name]: value });
        } else if (formType === 'signup') {
            setSignupData({ ...signupData, [name]: value });
        }
    }

    const HandleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { 
                email: loginData.email,
                password: loginData.password });
            localStorage.setItem('token', response.data.access_token);
            console.log(response.data);

            navigate('/dashboard');
        } catch (error) {
            setErrors({ login: 'Invalid email or password' });
        }

    }

    const HandleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: signupData.email,
                    password: signupData.password
                })
            });
            
            const data = await response.json();
            console.log(data);
            navigate('/login');
        } catch (error) {
            setErrors({ register: 'Registration failed' });
            console.error("Registration error:", error);
        }
    }


    return (
        <div className="container">
            <div className="intro-container">
                <h1>Skill</h1>
                <h2>Sprint</h2>
                <p>Improve your knowledge of coding, finance, <br></br>or languages</p>
            </div>

            <div className="form-container">
                <div className="tabs">
                    <div className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabChange('login')}>Login</div>
                    <div className={`tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => handleTabChange('register')}>Register</div>
                </div>
                {activeTab === 'login' ? (
                    <form onSubmit={HandleLogin}>
                        <div className="form-group">
                            <input className="Email" type="email" name="email" placeholder="Email" value={loginData.email} onChange={(e) => handleInputChange(e, "login")} required />
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <input className="Password" type="password" name="password" placeholder="Password" value={loginData.password} onChange={(e) => handleInputChange(e, "login")} required />
                            {errors.password && <div className="error">{errors.password}</div>}
                        </div>
                        <button className="login-button">Login</button>
                    </form>
                ) : (
                    <form onSubmit={HandleRegister}>
                        <div className="form-group">
                            <input className="Email" type="email" placeholder="Email" name="email" value={signupData.email} onChange={(e) => handleInputChange(e, "signup")} required />
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <input className="Password" type="password" placeholder="Password" name="password" value={signupData.password} onChange={(e) => handleInputChange(e, "signup")} required />
                            {errors.password && <div className="error">{errors.password}</div>}
                        </div>
                    <button className="login-button">Register</button>
                    </form>
                )}
            </div>
        </div>


    )
}

export default LoginSignup;