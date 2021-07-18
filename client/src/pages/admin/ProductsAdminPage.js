import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';

const ProductsAdminPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { notification } = useSelector((state) => state.ui);

  useEffect(() => {
    if (!isAuthenticated || !userInfo.isAdmin) {
      history.push('/login');
    }

    dispatch(fetchProducts());
  }, [dispatch, history, isAuthenticated, userInfo]);

  const productTable = (
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Estoque</th>
          <th>Preço</th>
          <th>Promo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.countInStock}</td>
            <td>{product.price}</td>
            <td>{product.promo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <main className='container'>
      <h1 className='heading-primary'>Gerenciar Produtos</h1>
      <Link to='/admin/produtos/novo' className='button m-2'>
        <i className='fas fa-plus'></i> Adicionar novo produto
      </Link>
      {notification && notification.status === 'loading' && <Loader />}
      {notification && notification.status === 'error' && (
        <Alert variant='danger'>{notification.message}</Alert>
      )}
      {products && productTable}
    </main>
  );
};

export default ProductsAdminPage;
