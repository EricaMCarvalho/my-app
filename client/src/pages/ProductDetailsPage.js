import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { fetchProductDetails } from '../store/productSlice';
import ProductDetails from '../components/ProductDetails';

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const { notification } = useSelector((state) => state.ui);
  const { product } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  return (
    <main className='container'>
      <Link to='/produtos' className='button m-2'>
        <i className='far fa-arrow-alt-circle-left'></i> Voltar
      </Link>
      {notification && notification.status === 'loading' && <Loader />}
      {notification && notification.status === 'error' && (
        <Alert variant='danger'>{notification.message}</Alert>
      )}
      {product && <ProductDetails product={product} />}
    </main>
  );
};

export default ProductDetailsPage;
