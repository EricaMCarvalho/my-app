import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { showNotification } from '../store/uiSlice';
import Alert from '../components/Alert';
import Loader from '../components/Loader';

const ShippingPage = () => {
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [tel, setTel] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  const dispatch = useDispatch();

  const { notification } = useSelector((state) => state.ui);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showNotification({ status: 'loading' }));

    const formData = {
      address,
      district,
      tel,
      postalCode,
      city,
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

      setAddress('');
      setDistrict('');
      setTel('');
      setPostalCode('');
      setCity('');
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
    <main className='container'>
      <h1 className='heading-primary'>
        <i className='far fa-envelope'></i> Contato para entrega
      </h1>
      <p className='my-2 text-center'>
        Prefere coletar o seu pedido?{' '}
        <Link to='/coleta'>
          <strong>Clique aqui.</strong>
        </Link>
      </p>
      <form className='form' onSubmit={handleSubmit}>
        {notification && notification.status === 'loading' && <Loader />}
        {notification && notification.status === 'success' && (
          <Alert variant='success'>{notification.message}</Alert>
        )}
        {notification && notification.status === 'error' && (
          <Alert variant='danger'>{notification.message}</Alert>
        )}
        <div className='form-group'>
          <label htmlFor='address'>Endereço</label>
          <input
            id='address'
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
          <label htmlFor='district'>Bairro</label>
          <input
            id='district'
            type='text'
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='postalCode'>CEP</label>
          <input
            id='postalCode'
            type='text'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='city'>Cidade</label>
          <input
            id='city'
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='button button-primary button-center'>
          Enviar
        </button>
      </form>
    </main>
  );
};

export default ShippingPage;
