import React, { useState } from "react";
import { serverAddress } from "../Utilities/constants";
import { Link, useNavigate } from "react-router-dom";




export const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('maya');
    
    const handleSubmit  = async(e) => {
        e.preventDefault();
        try {
            let res = await fetch(serverAddress + "/login", {
                method:'POST',
                body: JSON.stringify({
                    email: email,
                    password: password}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
            let resJson = await res.text();
            console.log(resJson);
            setEmail("");
            setPassword("");
            if(res.ok){
                console.log(resJson);
                localStorage.setItem("token", resJson);
                navigate("/mainPage");
                // need to switch form 
            } else {
                window.alert("could not log in " + resJson);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                {/* <label htmlFor="email">email</label> */}
                <input className= "form-inputs" value={email} type="email" placeholder="Type your email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                {/* <label htmlFor="password">password</label> */}
                <input className= "form-inputs" value={password} type="password" placeholder="Type your password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="login-btn">Login</button>
            </form>
            <p className="line"><span className="or-line">or</span></p>
            <Link to="/register" className="link-btn">Don't have an account? Register</Link>
        
            <Link to="/guest" className="link-btn">Login as a guest</Link>
        </div>

    )
}