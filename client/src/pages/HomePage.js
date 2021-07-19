import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import About from '../components/About';
import Hero from '../components/Hero';
import Contact from '../components/Contact';
import ProductList from '../components/ProductList';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { fetchProducts } from '../store/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { notification } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchProducts('featured'));
  }, [dispatch]);

  return (
    <main className='container'>
      <Hero />
      <div className='my-5'>
        <h1 className='heading-primary'>Produtos em destaque</h1>
        <h2 className='heading-secondary'>
          <i className='fas fa-cookie-bite'></i> Mais pedidos e novidades
        </h2>
        {notification && notification.status === 'loading' && <Loader />}
        {notification && notification.status === 'error' && (
          <Alert variant='danger'>{notification.message}</Alert>
        )}
        {products && <ProductList products={products} />}
      </div>
      <About />
      <Contact />
    </main>
  );
};

export default HomePage;
