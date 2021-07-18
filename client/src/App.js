import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
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

const AdminRoute = ({ children, ...rest }) => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated && userInfo.isAdmin ? (
          <>{children}</>
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

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

        <AdminRoute exact path='/admin/produtos'>
          <ProductsAdminPage />
        </AdminRoute>

        <AdminRoute path='/admin/produtos/novo'>
          <NewProductPage />
        </AdminRoute>

        <AdminRoute path='/admin/pedidos'>
          <OrdersAdminPage />
        </AdminRoute>

        <AdminRoute path='/admin/clientes'>
          <ClientsAdminPage />
        </AdminRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
