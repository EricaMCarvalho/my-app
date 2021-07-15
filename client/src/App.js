import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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

function App() {
  const dispatch = useDispatch();

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
        <Route path='/conta'>
          <UserProfilePage />
        </Route>
        <Route path='/cadastro'>
          <SignupPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
