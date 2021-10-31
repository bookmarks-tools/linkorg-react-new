import { Register } from './features/register/Register';
import { Login } from './features/login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './features/main/Home';
import { ButtonAppBar } from './components/Header/ButtonAppBar';

function App() {
  return (
    <Router>
      <div>
        <ButtonAppBar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
