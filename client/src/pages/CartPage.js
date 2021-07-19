import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { toRealCurrency } from '../helpers';

const CartPage = () => {
  const { cartItems, count } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('roma-cartItems', JSON.stringify(cartItems));
  }, [cartItems, dispatch]);

  const handleClick = () => {
    // TODO: checkout
  };

  return (
    <main className='container'>
      <h1 className='heading-primary'>
        <i className='fas fa-shopping-bag'></i> Sua sacola
      </h1>
      {cartItems.length === 0 ? (
        <h2
          className='heading-tertiary text-center my-3'
          style={{ fontWeight: '400' }}
        >
          Sua sacola está vazia.{' '}
          <Link to='/produtos' style={{ textDecoration: 'underline' }}>
            Conheça nossos produtos.
          </Link>
        </h2>
      ) : (
        <div className='cart-grid my-1'>
          <div className='cart-details'>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className='cart-checkout'>
            <div className='cart-checkout-content'>
              <h3 className='heading-tertiary'>Subtotal</h3>
              <p style={{ fontSize: '1.3rem' }} className='heading-tertiary'>
                ({count} items):
              </p>
              <h4 className='heading-quaternary'>
                <i className='fas fa-tag'></i>{' '}
                {toRealCurrency(
                  cartItems.reduce(
                    (total, current) => total + current.price * current.qty,
                    0
                  )
                )}
              </h4>
              <button
                onClick={handleClick}
                type='button'
                className='button button-primary'
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
