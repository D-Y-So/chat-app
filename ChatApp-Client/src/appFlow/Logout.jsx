import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { serverAddress } from "../Utilities/constants";
// import { Dialog, Transition } from "@headlessui/react";
// import { ExclamationIcon } from "@heroicons/react/outline";

//import { useAuth } from "../../contexts/AuthContext";

export default function Logout() {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();

  //const { logout, setError } = useAuth();

  async function handleLogout() {

    try {
        let token = localStorage.getItem("token");
        let res = await fetch(serverAddress + "/auth/logout", {
            method:'GET',
                headers:{
                    'Authorization': token
                }
        });
        if(res.ok){
            console.log("ok");
            localStorage.removeItem("token");
            navigate("/login");
        } else {
            window.alert("could not log out " + res.text());
        }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button className="logout-btn" onClick={() => handleLogout()}>logout</button>
    </div>
    
  );
}


