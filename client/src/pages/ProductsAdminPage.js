import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductsAdminPage = () => {
  const history = useHistory();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    } else if (!userInfo.isAdmin) {
      history.push('/produtos');
    }
  }, [history, isAuthenticated, userInfo]);

  return (
    <main className='container'>
      <h1 className='heading-primary'>Gerenciar Produtos</h1>
    </main>
  );
};

export default ProductsAdminPage;
