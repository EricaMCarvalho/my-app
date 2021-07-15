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
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductsAdminPage from './pages/admin/ProductsAdminPage';
import OrdersAdminPage from './pages/admin/OrdersAdminPage';
import ClientsAdminPage from './pages/admin/ClientsAdminPage';
import NewProductPage from './pages/admin/NewProductPage';

function App() {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route exact path='/produtos'>
          <ProductsPage />
        </Route>

        <Route exact path='/produtos/:id'>
          <ProductDetailsPage />
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
          exact
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
          path='/admin/produtos/novo'
          render={() =>
            isAuthenticated && userInfo.isAdmin ? (
              <NewProductPage />
            ) : (
              <Redirect to='/login' />
            )
          }
        />

        <Route
          exact
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
          exact
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
