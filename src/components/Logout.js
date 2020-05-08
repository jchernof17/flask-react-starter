import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../UserContext';

export const Logout = () => {
    const {user, setUser} = useContext(UserContext);
    useEffect(() => {
        if (user !== "false") {
            setUser(false);
            localStorage.setItem('User', false);
        }
    });

    return (
        <Redirect to="/" />
    )
}