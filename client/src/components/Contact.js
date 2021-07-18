import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <>
      <h1 className='heading-primary'>Fale conosco</h1>
      <h2 className='heading-secondary'>
        <i className='far fa-envelope'></i> Encomenda e informação
      </h2>
      <form className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input id='name' type='text' required />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' required />
        </div>
        <div className='form-group'>
          <label htmlFor='tel'>Telefone</label>
          <input id='tel' type='tel' required />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Mensagem</label>
          <textarea rows='5' id='message' required></textarea>
        </div>
        <button className='button button-primary button-center'>Enviar</button>
      </form>
      <div className='my-2 text-center'>
        Fale conosco pelas redes sociais:
        <div className='icons'>
          <Link to='https://wa.me/message/DLSM3VGHL6JQI1'>
            <i className='fab fa-whatsapp 3x'></i>
          </Link>
          <Link to='https://instagram.com/romadocesdevitrine?igshid=1alzkku4j1898'>
            <i className='fab fa-instagram 3x'></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Contact;
