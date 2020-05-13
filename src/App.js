import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { Navbar } from './components/Navbar'; 
import { Login } from './components/Login';
import { Register } from './components/Register';
import { HomepageLayout } from './components/HomepageLayout';
import { UserContext } from './UserContext';
import { Logout } from './components/Logout';


function App() {
  const [user, setUser] = useState(false);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    if (typeof localStorage.getItem("User") ==='undefined') {
      localStorage.setItem("User", false);
    }
    setUser(localStorage.getItem("User") || false);
  }, []);
  return (
    <Router>
      <UserContext.Provider value={value}>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <HomepageLayout/>
          </Route>
          <Route path="/other">
          <HomepageLayout/>
          </Route>
          <Route path="/page2">
            <HomepageLayout/>
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/"/> : <Login/>}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/"/> : <Register/>}
          </Route>
          <Route path="/logout">
            {user ? <Logout/> : <Redirect to="/login"/>}
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>

  );
}

export default App;