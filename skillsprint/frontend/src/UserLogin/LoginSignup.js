import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

axios.defaults.withCredentials = true;

const LoginSignup = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [signupData, setSignupData] = useState({ email: "", password: ""})
    const [LoginSuccessMessage, setLoginSuccessMessage] = useState("");
    const [RegisterSuccessMessage, setRegisterSuccessMessage] = useState("");
    const [errors, setErrors] = useState({});
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
            const response = await axios.post('http://localhost:4000/api/login', { 
                email: loginData.email,
                password: loginData.password 
            });
            setLoginSuccessMessage("Login successful");
            localStorage.setItem('token', response.data.access_token);
            console.log(response.data);
    
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors({ 
                    email: 'invalid email or password',
                    password: 'invalid email or password'
                 });
            } else {
                setErrors({ login: 'Login failed' });
            }
        }
    }
    
    const HandleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/register', {
                email: signupData.email,
                password: signupData.password
            });
            setRegisterSuccessMessage("Registration successful");
            
            console.log(response.data);
            navigate('/');
        } catch (error) {
                    // Assuming the error response contains a message
            if (error.response && error.response.data) {
                setErrors({
                    email: 'Registration failed', // Set specific error for email
                    password: 'Registration failed' // Set specific error for password
                });
            } else {
                setErrors({ register: 'An unexpected error occurred' });
            }
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
                        {LoginSuccessMessage && <div className="success-message">{LoginSuccessMessage}</div>} 
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
                        {RegisterSuccessMessage && <div className="success-message">{RegisterSuccessMessage}</div>}
                        <button className="login-button">Register</button>
                    </form>
                )}
            </div>
        </div>


    )
}

export default LoginSignup;