import React, { useContext, useState, useEffect } from 'react';
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
        <Redirect to={"/"+value}/>
        )
    }
    const create_link = (text, i=0) => {
      return (
        <Link key={text} to={{pathname: "/".concat(text)}}>
        <Menu.Item
          name={text}
          active={activeItem === text}
          //onClick={e => handleClick(text)}
        />
        </Link>
      )
    }
    const generated_links = links.map((link) => (
      create_link(link)
    ));
    return (
      <Menu style={{margin:0, borderTop:0}}>
        <Link to={{pathname: "/"}}>
        <Menu.Item header>app name</Menu.Item>
        </Link>
      {generated_links}
        {user ? 
        create_link('logout')
          :
          <React.Fragment>
          {create_link('login')}
          {create_link('register')}
          </React.Fragment>
        }
      </Menu>
    )
}