import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { UserContext } from '../UserContext';


export const Navbar = () => {
    const [activeItem, setActiveItem] = useState('');
    const {user} = useContext(UserContext);
    let links = ['about', 'clubs', 'events', 'other']
    const handleClick = (value) => {
        setActiveItem(value);
        return (
        <Redirect to={value}/>
        )
    }
    const generated_links = links.map(link => (
      <Link to={{pathname: "/".concat(link)}}>
        <Menu.Item
          name={link}
          active={activeItem === link}
          onClick={e => handleClick(link)}
        />
        </Link>
    ));
    return (
      <Menu style={{margin:0, borderTop:0}}>
        <Link to={{pathname: "/"}}>
        <Menu.Item header>app name</Menu.Item>
        </Link>
      {generated_links}
        {user ? 
        <Link to={{pathname: "/logout"}}>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={e => handleClick('logout')}
          />
          </Link>
          :
          <React.Fragment>
          <Link to={{pathname: "/login"}}>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={e => handleClick('login')}
          />
          </Link>
          <Link to={{pathname: "/register"}}>
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={e => handleClick('register')}
          />
          </Link>
          </React.Fragment>
        }
      </Menu>
    )
}