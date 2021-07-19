import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
  const { count } = useSelector((state) => state.cart);
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
          <i className='header-icon fas fa-shopping-bag'>
            <small className='header-button-label'>{count}</small>
          </i>
        </div>
      </a>
    </header>
  );
};

export default Header;
