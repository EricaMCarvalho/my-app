import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Loader from './components/Loader';
import ShippingPage from './pages/ShippingPage';

// Lazy imports
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const ProductsAdminPage = lazy(() => import('./pages/admin/ProductsAdminPage'));
const OrdersAdminPage = lazy(() => import('./pages/admin/OrdersAdminPage'));
const ClientsAdminPage = lazy(() => import('./pages/admin/ClientsAdminPage'));
const NewProductPage = lazy(() => import('./pages/admin/NewProductPage'));

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
    <Suspense
      fallback={
        <main className='container'>
          <Loader />
        </main>
      }
    >
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

          <Route path='/login'>
            <LoginPage />
          </Route>

          <Route path='/cadastro'>
            <SignupPage />
          </Route>

          <Route path='/entrega'>
            <ShippingPage />
          </Route>

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
    </Suspense>
  );
}

export default App;
