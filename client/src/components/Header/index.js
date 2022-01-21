import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className='mb-4 py-2 flex-row align-center'>
      <div className='container flex-row justify-space-between-lg justify-center align-center'>
        <Link to='/'>
          <h1>What's Happenin'</h1>
          <h5>There's Always Something Going on</h5>
        </Link>

        <nav className='text-center'>
          {Auth.loggedIn() ? (
            <>
              <Link to='/profile'>
                <span className='icon'>
                  <i className='fas fa-user-circle'></i>
                </span>
                Profile
              </Link>

              <a href='/' onClick={logout}>
                <span className='icon'>
                  <i className='fas fa-sign-out-alt'></i>
                </span>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to='/login'>
                <span className='icon'>
                  <i className='fas fa-sign-in-alt'></i>
                </span>
                Login
              </Link>
              <Link to='/signup'>
                <span className='icon'>
                  <i className='fas fa-user-plus'></i>
                </span>
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
