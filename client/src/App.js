import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/cadastro'>
          <SignupPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
