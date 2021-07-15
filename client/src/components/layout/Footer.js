import React from 'react';

const Footer = () => {
  return (
    <footer className='footer'>
        <p className='footer__text'>
          &copy; {new Date().getFullYear()} Roma Doces de Vitrine
        </p>
    </footer>
  )
}

export default Footer;
