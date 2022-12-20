import {useEffect, useState} from "react";

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;
    if(initialValue instanceof Function) return initialValue();
    return initialValue;
}


export function useLocalStrorage(key,initialValue) {
    const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });
  useEffect(()=> {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
    return [value, setValue];
}
export function getToken()
{
    const token = localStorage.getItem('token');
    if(!token) console.log("You are not logged in.\nYou must log in to use this feature");
    return token;
}