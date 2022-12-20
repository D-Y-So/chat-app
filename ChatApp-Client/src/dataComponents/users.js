import { useEffect, useState } from "react";
import { getAllRegisteredUsers } from "../Utilities/rest";
let addUserFunc;
export function GetUsers()
{
    const [users, setUsers] = useState([]);
    const [newUsers, setnewUsers] = useState([]);
    useEffect(()=>
    {
        let lastUpdate = new Date();
        async function init()
        {
            let usersFromApi=await getAllRegisteredUsers();
            //console.log(usersFromApi);
            setUsers(usersFromApi);           
            lastUpdate=new Date();
        }
        init();
        addUserFunc=addNewUser;
        return () => addUserFunc = null;
        /*
        const interval = setInterval(getUsers,5000);
        return () => clearInterval(interval);
        async function getUsers()
        {
            let usersFromApi=await getAllRegisteredUsers(lastUpdate);
            // console.log(usersFromApi instanceof Array);
            if(usersFromApi.length>0) {
            setnewUsers(usersFromApi);          
            setUsers((users) =>users.concat(usersFromApi));                
            }
            lastUpdate=new Date();
        }*/
    },[]);
    useEffect(()=>
    {
        console.log("users list changed");
        console.log(users);
    },[users]);
    useEffect(()=>{
        console.log("new users list changed");
      console.log(newUsers);
    },[newUsers]);
    function addNewUser(user)
    {
        setUsers((users) => [...users, user]);
    }
   
    
    return [users];
}
export function addNewUser(user)
{
    if(addUserFunc) {
        addUserFunc(user);
    }
}