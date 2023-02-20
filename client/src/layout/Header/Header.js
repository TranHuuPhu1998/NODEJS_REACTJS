import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <nav className='navbar-absolute fixed-top navbar-transparent navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <div className='navbar-wrapper'>
          <a href={location.pathname} className='navbar-brand'>
            {location.pathname === '/' ? 'Login Page' : 'Register Page'}
          </a>
        </div>
        <div className='collapse navbar-collapse'>
          <ul className='ml-auto navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/register'>
                <i className='tim-icons icon-laptop' /> Register
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link active' to='/'>
                <i className='tim-icons icon-single-02' /> Login
              </NavLink>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#/auth/lock-screen'>
                <i className='tim-icons icon-lock-circle' /> Lock
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
