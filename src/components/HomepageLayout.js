import React, { useContext } from 'react';
import { UserContext } from '../UserContext';


export const HomepageLayout = () => {
  const {user} = useContext(UserContext);
  return (
    <React.Fragment>
      {user ? <h2>Welcome, {user.name}. Your ID is #{user.id}</h2> : <h2>Welcome, non-logged-in user.</h2>}
    </React.Fragment>
  )
  }
