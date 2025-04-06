import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import './LoginRegister.css';

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);

    const registerLink = () => setAction('active');
    const loginLink = () => setAction('');

    return (
        <div className={`wrapper ${action}`}>
            <div className="form-box login">
                <form>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                        />
                        <FaLock className="icon" />
                        {showPassword ? (
                            <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(false)} />
                        ) : (
                            <FaEye className="eye-icon" onClick={() => setShowPassword(true)} />
                        )}
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Email" required />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                        />
                        <FaLock className="icon" />
                        {showRegisterPassword ? (
                            <FaEyeSlash className="eye-icon" onClick={() => setShowRegisterPassword(false)} />
                        ) : (
                            <FaEye className="eye-icon" onClick={() => setShowRegisterPassword(true)} />
                        )}
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /> I agree to the terms & conditions</label>
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;