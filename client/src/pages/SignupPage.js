import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../store/uiSlice';
import { signup } from '../store/authSlice';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const { notification } = useSelector((state) => state.ui);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/produtos');
    }
  }, [history, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(
        showNotification({
          status: 'error',
          message:
            'Verifique se os campos de senha e confirmação de senha coincidem exatamente',
        })
      );
    } else {
      const userData = { firstName, lastName, email, password };
      dispatch(signup(userData));
    }
  };
  return (
    <main className='container'>
      <h1 className='heading-primary'>Cadastre-se</h1>
      <h2 className='heading-secondary'>
        <i className='fas fa-user'></i> Crie sua conta
      </h2>
      <form className='form' onSubmit={handleSubmit}>
        {notification && notification.status === 'loading' && <Loader />}
        {notification && notification.status === 'error' && (
          <Alert variant='danger'>{notification.message}</Alert>
        )}
        <div className='form-group'>
          <label htmlFor='first-name'>Nome</label>
          <input
            id='first-name'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='last-name'>Sobrenome</label>
          <input
            id='last-name'
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          <label htmlFor='password'>Senha</label>
          <input
            id='password'
            type='password'
            minLength='8'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirme sua senha</label>
          <input
            id='password2'
            type='password'
            min-length='8'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='button button-center'>
          Cadastrar
        </button>
      </form>
      <p className='my-2 text-center'>
        Já possui uma conta?{' '}
        <Link to='/login'>
          <strong>Faça seu login</strong>
        </Link>
      </p>
    </main>
  );
};

export default SignupPage;
