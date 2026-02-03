import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LoginPatient() {
debugger
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginPatient = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/patientDetails/login`, { username: userName, password: userPassword });
            alert("Login Successfully!");
            navigate("/home");

            console.log("Login success:", response.data);
        } catch (error) {
            alert("Login Failed. Check username or password.");
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="login-container">
            <h2>Patient Login</h2>

            <form onSubmit={handleLoginPatient}>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPatient;
