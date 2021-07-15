import React from 'react';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='overlay-dark'>
        <div className='hero__content'>
          <div className='hero__content__image'>
            <img src='/images/logo-text.png' alt='Roma' />
          </div>
          <h2 className='heading-secondary lead'>Amor em forma de doce</h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
