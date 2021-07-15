import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

const UserProfilePage = () => {
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [history, isAuthenticated]);

  return (
    <main className='container'>
      <h1 className='heading-primary'>Sua conta</h1>
      <h2 className='heading-secondary'>
        <i class='fas fa-shopping-bag'></i> Seus pedidos
      </h2>
    </main>
  );
};

export default UserProfilePage;
