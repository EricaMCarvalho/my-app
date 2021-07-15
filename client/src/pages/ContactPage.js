import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <main className='container'>
      <h1 className='heading-primary'>Fale conosco</h1>
      <h2 className='heading-secondary'>
        <i className='far fa-envelope'></i> Encomenda e informação
      </h2>
      <div className='my-2 text-center'>
        Redes sociais:
        <div className='icons'>
          <Link to='https://wa.me/message/DLSM3VGHL6JQI1'>
            <i className='fab fa-whatsapp 3x'></i>
          </Link>
          <Link to='https://instagram.com/romadocesdevitrine?igshid=1alzkku4j1898'>
            <i className='fab fa-instagram 3x'></i>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
