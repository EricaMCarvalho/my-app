import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className='header'>
      <Navigation />

      <div className='header-logo-box'>
        <Link to='/'>
          <img src='/images/roma-text.png' alt='Roma' />
        </Link>
      </div>
      <a href='/sacola'>
        <div className='header-button header-button--left'>
          <i className='header-icon fas fa-shopping-bag'></i>
        </div>
      </a>
    </header>
  );
};

export default Header;
