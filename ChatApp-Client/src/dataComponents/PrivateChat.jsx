import { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { serverAddress } from "./../Utilities/constants";
import { getAllUserPrivateMessages} from "../Utilities/rest";
import { sendPrivateMessage } from "../Utilities/rest";
import {MainPage} from "../appFlow/MainPage";
import Logout from "../appFlow/Logout";
import SelfProfile from "./SelfProfile";
import OtherProfile from "./OtherProfile";

let addMessageToPrivateMessages;
export default function PrivateChat ({user}) {
    const [messages, setMessages] = useState([]);
    const [messageToSend, setMessageToSend] = useState("");
    const [mainPage, setMainPage] = useState(false);
    const [displayProfile, setDisplayProfile] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [buttonText, setButtonText] = useState("view profile")

    // let set = setTab
    useEffect(() => {
        async function init() {
            let res = await getAllUserPrivateMessages(user);
            setMessages(res);          
        }
        init();
        addMessageToPrivateMessages=addPrivateMessage;     
        return () => addMessageToPrivateMessages = null    
    },[]);

    useEffect(() => {
        console.log("here");
    },[messages]);


    function inputMessage(e) {
        setMessageToSend(e.target.value);
    }

    function onClickClose() {
        setMainPage(true)
    };

    function onClickProfile() {
        setDisplayProfile(!displayProfile);
        if(displayProfile === false){
            setButtonText("hide profile")
        } else {
            setButtonText("view profile");
        }
        console.log(displayProfile)
    }

    function addPrivateMessage(message){
        setMessages((messages) =>[...messages, message])
    }

    function changeText() {

    }


    return (
        <div>
        {mainPage === true ? <MainPage/> :
        <div>
            <div className="private-messages">

                <h2 className="title-private-chat">private chat with {user}</h2>
                <div className="messages-container">
                    <div className="messages">
                        <ul>{messages && messages.map(
                            (message, index) => <li className = "message-li" key={index}>{message.time + "  " + message.sender + ": " + message.content}</li>
                        )}</ul>

                    </div>
                    <input className="text-in" onChange={inputMessage}></input>
                    <button className="send-btn" onClick={() => sendPrivateMessage(messageToSend, user)}>send</button>
                </div>
            </div>
            <div >
                <button className="profile-btn-private-chat" onClick={onClickProfile}> {buttonText}</button>
            </div> 
            {/* <div className="logout-btn-private">
                <Logout/>
            </div> */}
            <div>
                {/* <button
                    type="button"
                    className="closebtn"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onClickClose}
                >
                <span aria-hidden="true">&times;</span>
                </button> */}
                <button className="main-btn-private-chat" onClick={onClickClose}>main room</button>
            </div>
            <div> {displayProfile === true ? <OtherProfile user={user}/>: <div></div>
                }
            </div>
        </div> }
        </div>

    )

}

export function addPrivateMessage(message) {
    if(addMessageToPrivateMessages) {
        addMessageToPrivateMessages(message);
    }
}



