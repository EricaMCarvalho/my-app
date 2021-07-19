import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toRealCurrency } from '../helpers';
import { updateItemQty, removeItemsFromCart } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty);

  const dispatch = useDispatch();

  const updateQty = (e) => {
    setQty(Number(e.target.value));
    dispatch(updateItemQty({ id: item.id, qty: Number(e.target.value) }));
  };

  const handleClick = () => {
    dispatch(removeItemsFromCart({ id: item.id, qty: item.qty }));
  };

  return (
    <div className='cart-item'>
      <Link to={`/produtos/${item.id}`}>
        <img src={item.image} alt={item.name} />
      </Link>
      <div className='cart-item-info'>
        <Link to={`/produtos/${item.id}`}>
          <h3 style={{ display: 'inline-block' }} className='heading-tertiary'>
            {item.name}
          </h3>
        </Link>
        <h4 style={{ display: 'inline-block' }} className='heading-quaternary'>
          <i className='fas fa-tag'></i> {toRealCurrency(item.price)}
        </h4>
        <form className='cart-item-form product-form'>
          <div
            className='form-control my-1'
            style={{ display: 'inline-block' }}
          >
            {' '}
            <label htmlFor={`qty-${item.id}`}>Quantidade: </label>
            <select id={`qty-${item.id}`} value={qty} onChange={updateQty}>
              {[...Array(item.countInStock).keys()].map((q) => (
                <option key={q + 1} value={q + 1}>
                  {q + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            type='button'
            onClick={handleClick}
            className='button button-primary'
          >
            <i className='fas fa-trash-alt'></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartItem;
