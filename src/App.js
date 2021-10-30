import { Register } from './Register';
import { Login } from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './Home';
import { ButtonAppBar } from './ButtonAppBar';

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
