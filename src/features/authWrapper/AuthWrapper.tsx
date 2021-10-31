import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Main } from '../main/Main';

export const AuthWrapper = () => {
  const history = useHistory();
  const [accessToken] = useLocalStorage<string>('accessToken');

  useEffect(() => {
    if (!accessToken) {
      history.push('/login');
    }
  }, [accessToken]);

  return <div className="wrapper">{accessToken ? <Main /> : <div>Login</div>}</div>;
};
