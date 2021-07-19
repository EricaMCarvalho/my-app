import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { notification } = useSelector((state) => state.ui);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split('=')[1] : 1;

  useEffect(() => {
    if (isAuthenticated) {
      history.push(`/${redirect}` || '/produtos');
    }
  }, [history, isAuthenticated, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };
  return (
    <main className='container'>
      <h1 className='heading-primary'>Entrar</h1>
      <h2 className='heading-secondary'>
        <i className='fas fa-user'></i> Faça seu login
      </h2>

      <form className='form' onSubmit={handleSubmit}>
        {notification && notification.status === 'loading' && <Loader />}
        {notification && notification.status === 'error' && (
          <Alert variant='danger'>{notification.message}</Alert>
        )}
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
        <button type='submit' className='button button-center'>
          Entrar
        </button>
      </form>
      <p className='my-2 text-center'>
        Quer criar uma conta?{' '}
        <Link to={redirect ? `/cadastro?redirect=${redirect}` : '/cadastro'}>
          <strong>Faça seu cadastro</strong>
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
