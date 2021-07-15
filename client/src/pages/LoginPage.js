import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login());
  };

  return (
    <main className='container'>
      <section>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
