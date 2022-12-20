import { useEffect, useState } from "react";
import { getPublicMessages } from "../Utilities/rest";

let addMessageToPublicMessages;
export function usePublicMesagges() {
    const [messages, setMessages] = useState([]);
    useEffect(() =>{ 
        console.log("something changed");}, [messages]);
    useEffect(()=>{
        async function func()
        { 
            const response=await getPublicMessages();
            setMessages(response);
        }
        func();
        addMessageToPublicMessages= addMessage;
        return () => addMessageToPublicMessages = null      
    },[]);
    function addMessage(message) {
       setMessages((messages) => [...messages, message]);
    }
    return [messages, addMessage];
}
export function addMessage(message) {
    if(addMessageToPublicMessages) {
        addMessageToPublicMessages(message);
    }
}