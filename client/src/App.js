import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { setAuthInfo } from './store/authSlice';
import UserProfilePage from './pages/UserProfilePage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import ProductsAdminPage from './pages/ProductsAdminPage';
import OrdersAdminPage from './pages/OrdersAdminPage';
import ClientsAdminPage from './pages/ClientsAdminPage';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const userInfo = localStorage.getItem('roma-userInfo')
      ? JSON.parse(localStorage.getItem('roma-userInfo'))
      : {};
    const token = localStorage.getItem('roma-token') || null;
    const expiresAt = localStorage.getItem('roma-expiresAt') || null;

    const now = new Date().getTime() / 1000;
    const isAuthenticated = token && expiresAt && now < expiresAt;

    dispatch(setAuthInfo({ userInfo, token, expiresAt, isAuthenticated }));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route path='/produtos'>
          <ProductsPage />
        </Route>

        <Route path='/sobre-nos'>
          <AboutPage />
        </Route>

        <Route path='/contato'>
          <ContactPage />
        </Route>

        <Route path='/sacola'>
          <CartPage />
        </Route>

        <Route
          path='/conta'
          render={() =>
            isAuthenticated ? <UserProfilePage /> : <Redirect to='/login' />
          }
        />

        <Route
          path='/cadastro'
          render={() =>
            !isAuthenticated ? <SignupPage /> : <Redirect to='/produtos' />
          }
        />

        <Route
          path='/login'
          render={() =>
            !isAuthenticated ? <LoginPage /> : <Redirect to='/produtos' />
          }
        />

        <Route
          path='/admin/produtos'
          render={() =>
            isAuthenticated && userInfo.isAdmin ? (
              <ProductsAdminPage />
            ) : (
              <Redirect to='/login' />
            )
          }
        />

        <Route
          path='/admin/pedidos'
          render={() =>
            isAuthenticated && userInfo.isAdmin ? (
              <OrdersAdminPage />
            ) : (
              <Redirect to='/login' />
            )
          }
        />

        <Route
          path='/admin/clientes'
          render={() =>
            isAuthenticated && userInfo.isAdmin ? (
              <ClientsAdminPage />
            ) : (
              <Redirect to='/login' />
            )
          }
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
