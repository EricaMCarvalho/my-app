import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='navigation-nav'>
      <ul className='navigation-list'>
        <li className='navigation-item'>
          <Link to='/' className='navigation-link'>
            Página inicial
          </Link>
        </li>

        <li className='navigation-item'>
          <Link to='/produtos' className='navigation-link'>
            Nossos Produtos
          </Link>
        </li>

        <li className='navigation-item'>
          <Link to='/sobre-nos' className='navigation-link'>
            Sobre nós
          </Link>
        </li>

        <li className='navigation-item'>
          <Link to='/contato' className='navigation-link'>
            Fale Conosco
          </Link>
        </li>

        <li className='navigation-item'>
          <Link to='/sacola' className='navigation-link'>
            Sua sacola
          </Link>
        </li>

        <li className='navigation-item'>
          <Link to='/pedidos' className='navigation-link'>
            Seus pedidos
          </Link>
        </li>

        <li className='navigation-item'>
          <Link to='/cadastro' className='navigation-link'>
            Entre
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
