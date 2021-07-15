import React from 'react';
import { Link } from 'react-router-dom';
import { toRealCurrency } from '../helpers';

const ProductList = ({ products }) => {
  return (
    <div className='product-list'>
      {products.map((product) => (
        <Link
          to={`/produtos/${product._id}`}
          key={product._id}
          className='product-list__item'
        >
          <img className='' src={product.image} alt={product.name} />
          <div className='product-list__item-info'>
            <h2 className='heading-tertiary'>{product.name}</h2>
            <h3 className='heading-quaternary'>
              <i className='fas fa-tag'></i> {toRealCurrency(product.price)}
            </h3>
            {product.promo && (
              <small className='small-text'>{product.promo}</small>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
