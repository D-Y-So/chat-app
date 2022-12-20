import { useEffect, useState } from "react";
import { getAllRegisteredUsers } from "../Utilities/rest";
export function GetUsersNew()
{
    const [users, setUsers] = useState([]);
    const [newUsers, setnewUsers] = useState([]);
    const [lastUpdate, setLastUpdate] = useState();
    useEffect(()=>
    {
        async function init()
        {
            let usersFromApi=await getAllRegisteredUsers();
            console.log(usersFromApi);
            setUsers(usersFromApi);
            console.log(users)
            let date = new Date();
            setLastUpdate(date);
        }
        init();
        const interval = setInterval(getUsers,5000);
        return () => clearInterval(interval);
    },[]);
    async function getUsers()
    {
        let usersFromApi=await getAllRegisteredUsers(lastUpdate);
        // console.log(usersFromApi instanceof Array);
        let difference = [...usersFromApi].filter(x => !users.includes(x));
        // console.log(usersFromApi);
        if(difference.length>0) {
            // console.log("difference");
            // console.log(newUsers);
            // console.log("users");
            // console.log(users);
            setnewUsers(difference);
            setUsers((users) => [...users, newUsers]);
        }
        // } else {
        //     setnewUsers([]);
        // }
    }
    
    return [users];
}