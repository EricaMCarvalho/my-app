import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const OrdersAdminPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !userInfo.isAdmin) {
      history.pushState('/login');
    }

    // TODO: fetch orders
  }, [dispatch, history, isAuthenticated, userInfo]);

  return (
    <main className='container'>
      <h1 className='heading-primary'>Gerenciar pedidos</h1>
    </main>
  );
};

export default OrdersAdminPage;
