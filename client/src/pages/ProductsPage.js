import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import ProductList from '../components/ProductList';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { notification } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main className='container'>
      <h1 className='heading-primary'>Nossos Produtos</h1>
      <h2 className='heading-secondary'>
        <i className='fas fa-cookie-bite'></i> Conheça nossos produtos
      </h2>
      {notification && notification.status === 'loading' && <Loader />}
      {notification && notification.status === 'error' && (
        <Alert variant='danger'>{notification.status}</Alert>
      )}
      {products && <ProductList products={products} />}
    </main>
  );
};

export default ProductsPage;
