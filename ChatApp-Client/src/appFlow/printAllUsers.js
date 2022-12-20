import { GetUsers } from "../dataComponents/users";

export default function PrintAllUsers()
{
    const [users] = GetUsers();
    return (
        <div className="users">
        <div className="usersList">
            <ul>{users.map(
                (user,index) => <li key={index}>{PrintUser(user)}</li>
            )}</ul>
            </div>           
           </div>
    )
}
function PrintUser(User)
{
    return (
        <div className="user">
            <h3>{User.username}</h3>
            <p>{User.email}</p>
        </div>
    )
}