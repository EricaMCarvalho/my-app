import React from 'react';
import Nav from './Nav';

const Navigation = () => {
  return (
    <div className='navigation'>
      <input type='checkbox' className='navigation-checkbox' id='navi-toggle' />
      <label
        htmlFor='navi-toggle'
        className='header-button header-button--right navigation-button'
      >
        <span className='navigation-icon'></span>
      </label>

      <Nav />
    </div>
  );
};

export default Navigation;
