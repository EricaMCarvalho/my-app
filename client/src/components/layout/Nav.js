import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

const Nav = () => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='navigation-nav'>
      {isAuthenticated && (
        <h2 className='heading-secondary'>Olá, {userInfo.firstName}</h2>
      )}
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

        {isAuthenticated && (
          <li className='navigation-item'>
            <Link to='/conta' className='navigation-link'>
              Seus pedidos
            </Link>
          </li>
        )}

        <li className='navigation-item'>
          {isAuthenticated ? (
            <Link
              to='/login'
              onClick={handleLogout}
              className='navigation-link'
            >
              Sair
            </Link>
          ) : (
            <Link to='/login' className='navigation-link'>
              Entrar
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
