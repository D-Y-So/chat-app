import { useState } from "react";
import {guestLogin} from "../Utilities/rest";
import { Link, useNavigate } from "react-router-dom";
export const GuestLogin = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const message="guestToken: ";

    const handleSubmit = async(e) => { 
        e.preventDefault();
        try{
        guestLogin(username).then(async (res)=>{
            if(res.ok){
              let token= await res.text();
              token=token.substring(message.length);
              localStorage.setItem("token", token);
              console.log(token);
              navigate("/mainPage");                        
            }
            else {
                window.alert("could not log in " + res);
            }
        });
    }
    catch(err){
        window.alert(err);
    }
        
    }
    
    return (
        <div className="guest-login">
            <h2 className="guest-lgn-title">Login as a Guest:</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input className="form-inputs"   placeholder="Type your Temporary name here:" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                <button type="submit"  className="login-btn">Login</button>
                <p className="line"><span className="or-line">or</span></p>
                <Link to="/register" className="link-btn">Register here</Link>
            </form>
        </div>
    )

}

export default GuestLogin;