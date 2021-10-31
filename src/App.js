import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Register } from './features/register/Register';
import { Login } from './features/login/Login';
import { AuthWrapper } from './features/authWrapper/AuthWrapper';
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
            <AuthWrapper />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
