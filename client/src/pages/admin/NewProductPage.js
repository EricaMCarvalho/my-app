import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import { createProduct } from '../../store/productSlice';

const NewProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [promo, setPromo] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  // TODO: include discount
  // const [discount, setDiscount] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const { notification } = useSelector((state) => state.ui);

  useEffect(() => {
    if (!isAuthenticated || !userInfo.isAdmin) {
      history.pushState('/login');
    }
  }, [history, isAuthenticated, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price,
      countInStock,
      promo,
      image,
      category,
      description,
    };

    dispatch(createProduct(productData));

    setName('');
    setPrice(0);
    setCountInStock(0);
    setPromo('');
    setImage('');
    setCategory('');
    setDescription('');
  };

  return (
    <main className='container'>
      <Link to='/admin/produtos' className='button m-2'>
        <i className='far fa-arrow-alt-circle-left'></i> Voltar
      </Link>
      <h1 className='heading-primary'>Adicionar novo produto</h1>
      <form className='form' onSubmit={handleSubmit}>
        {notification && notification.status === 'loading' && <Loader />}
        {notification && notification.status === 'success' && (
          <Alert variant='success'>{notification.message}</Alert>
        )}
        {notification && notification.status === 'error' && (
          <Alert variant='danger'>{notification.message}</Alert>
        )}
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Preço</label>
          <input
            id='price'
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='stock'>Quantidade em estoque</label>
          <input
            id='stock'
            type='number'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='promo'>Texto de promoção</label>
          <input
            id='promo'
            type='text'
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='image'>Imagem</label>
          <input
            id='image'
            type='text'
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Categoria</label>
          <input
            id='category'
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Descrição</label>
          <textarea
            rows='4'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type='submit' className='button button-center'>
          Adicionar produto
        </button>
      </form>
    </main>
  );
};

export default NewProductPage;
