import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { showNotification } from '../store/uiSlice';
import Alert from './Alert';
import Loader from './Loader';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const { notification } = useSelector((state) => state.ui);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showNotification({ status: 'loading' }));

    const formData = {
      name,
      email,
      subject,
      tel,
      message,
    };

    try {
      await axios.post('/api/contact', formData);

      dispatch(
        showNotification({
          status: 'success',
          message: 'Mensagem enviada com successo',
        })
      );

      setTimeout(() => {
        dispatch(showNotification(null));
      }, 5000);

      setName('');
      setEmail('');
      setSubject('');
      setTel('');
      setMessage('');
    } catch (error) {
      dispatch(
        showNotification({
          status: 'error',
          message:
            error.response && error.response.data.error
              ? error.response.data.error
              : error.message,
        })
      );

      setTimeout(() => {
        dispatch(showNotification(null));
      }, 5000);
    }
  };

  return (
    <>
      <h1 className='heading-primary'>Fale conosco</h1>
      <h2 className='heading-secondary'>
        <i className='far fa-envelope'></i> Encomenda e informação
      </h2>
      <form className='form' onSubmit={handleSubmit}>
        {notification && notification.status === 'loading' && <Loader />}
        {notification && notification.status === 'success' && (
          <Alert variant='success'>{notification.message}</Alert>
        )}
        {notification && notification.status === 'error' && (
          <Alert variant='danger'>{notification.message}</Alert>
        )}
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='tel'>Telefone</label>
          <input
            id='tel'
            type='tel'
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='subject'>Assunto</label>
          <input
            id='subject'
            type='text'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxlength='50'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='message'>Mensagem</label>
          <textarea
            rows='9'
            id='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type='submit' className='button button-primary button-center'>
          Enviar
        </button>
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
