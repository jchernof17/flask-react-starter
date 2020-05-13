import { createContext } from "react";

var local_user = localStorage.getItem('User');
if (local_user ==='undefined' || local_user === false || local_user === 'false') {
    local_user = false;
}
export const UserContext = createContext(local_user);