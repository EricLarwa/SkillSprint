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
            const response = await axios.post('http://localhost:5000/api/login', { Email, Password });
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
            const response = await axios.post('http://localhost:5000/api/register', { Email, Password });
            console.log(response.data);
            navigate('/login');

        } catch (error) {
            setErrors({ register: 'Email already exists' });
        }


    }


    return (
        <div className="container">
            <div className="intro-container">
                <h1>Skill Sprint</h1>
                <p>Improve your knowledge of coding, finance, or languages</p>
            </div>

            <div className="form-container">
                <div className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabChange('login')}>Login</div>
                <div className={`tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => handleTabChange('register')}>Register</div>
                {activeTab === 'login' ? (
                    <form onSubmit={HandleLogin}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Email" value={loginData.email} onChange={(e) => handleInputChange(e, "login")} required />
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Password" value={loginData.password} onChange={(e) => handleInputChange(e, "login")} required />
                            {errors.password && <div className="error">{errors.password}</div>}
                        </div>
                    </form>
                ) : (
                    <form onSubmit={HandleRegister}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Email" value={signupData.email} onChange={(e) => handleInputChange(e, "signup")} required />
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Password" value={signupData.password} onChange={(e) => handleInputChange(e, "signup")} required />
                            {errors.password && <div className="error">{errors.password}</div>}
                        </div>
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={HandleLogin}>Login</button>
                    </form>
                )}
            </div>
        </div>


    )
}

export default LoginSignup;