import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import './LoginRegister.css';

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [message, setMessage] = useState('');

    const registerLink = () => setAction('active');
    const loginLink = () => setAction('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: registerUsername,
                email: registerEmail,
                password: registerPassword
            })
        });

        const data = await res.json();
        setMessage(data.message);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: loginUsername,
                password: loginPassword
            })
        });

        const data = await res.json();
        setMessage(data.message);
    };

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                        />
                        <FaLock className="icon" />
                        {showPassword ? (
                            <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(false)} />
                        ) : (
                            <FaEye className="eye-icon" onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                            required
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                        />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="Password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                        />
                        <FaLock className="icon" />
                        {showRegisterPassword ? (
                            <FaEyeSlash className="eye-icon" onClick={() => setShowRegisterPassword(false)} />
                        ) : (
                            <FaEye className="eye-icon" onClick={() => setShowRegisterPassword(true)} />
                        )}
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default LoginRegister;
