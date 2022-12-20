import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverAddress } from "../Utilities/constants";

// export const Register = (props) => {
export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    //const [messsage, setMessage] = useState('');

    async function handleSubmit(e) {
        console.log("entered func")
        e.preventDefault();
        try {
            let res = await fetch(serverAddress + "/register", {
                method:'POST',
                body: JSON.stringify({
                    username:username,
                    email: email,
                    password: password}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
            let resJson = await res.text();
            console.log(resJson);
            setUsername("");
            setEmail("");
            setPassword("");
            if(res.ok){
                window.alert("email activation was sent, please check your email");
                navigate("/login")
                //props.onFormSwitch('login');
            } else {
                window.alert("could not create user " + resJson);
            }
        } catch (err) {
            
            console.log(err);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                {/* <label htmlFor="email">email</label> */}
                <input className= "form-inputs" value={email} type="email" placeholder="Type your email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                {/* <label htmlFor="password">password</label> */}
                <input className= "form-inputs" value={password} type="password" placeholder="Type your password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                {/* <label htmlFor="username">username</label> */}
                <input className= "form-inputs" value={username} type="username" placeholder="Type your username" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
                <button className="register-btn" type="submit">Register</button>
            </form>
            <Link to="/login" className="link-btn">Already have an account? Login</Link>
            <Link to="/guest" className="link-btn">Login as a guest.</Link>
            {/* <button className="link-btn" onClick={() => navigate("/login")}>Already have an account? Login</button> */}
        </div>
    );
}