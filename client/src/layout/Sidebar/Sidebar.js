import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from '../../components';
import navLink from './nav';
import './Sidebar.scoped.scss';

const navsRouteSite = navLink();

function Sidebar(props) {
  return (
    <div className='sidebar'>
      <div className='sidebar-wrapper'>
        <Nav>
          {navsRouteSite?.map((item, index) => {
            return (
              <li
                key={index}
              >
                <NavLink
                  to={item.to}
                  exact={!!item.exact}
                  className='nav-link'
                  activeClassName='active'
                >
                  <img src={item.icon} />
                  <p>{item.title_const}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
