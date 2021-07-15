import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ClientsAdminPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !userInfo.isAdmin) {
      history.pushState('/login');
    }

    // TODO: fetch clients
  }, [dispatch, history, isAuthenticated, userInfo]);
  return (
    <main className='container'>
      <h1 className='heading-primary'>Gerenciar Clientes</h1>
    </main>
  );
};

export default ClientsAdminPage;
