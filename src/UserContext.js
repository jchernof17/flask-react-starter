import { createContext } from "react";

var local_user = JSON.parse(localStorage.getItem('User'));
if (typeof local_user === 'string' || local_user instanceof String || local_user === false) {
    local_user = false;
}
export const UserContext = createContext(local_user);