import { Box, Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { httpClient } from '../../app/httpClient';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { UserInfo } from '../user/UserType';

export const Login = () => {
  const history = useHistory();
  const [accessToken, setAccessToken] = useLocalStorage('accessToken');
  const [user, setUser] = useLocalStorage<UserInfo>('user');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    httpClient.post('/auth/login', formFields).then(({ data }) => {
      setAccessToken(data.accessToken);
      setUser(data);
      history.push('/');
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField name="email" type="email" label="email" />
        </div>
        <div>
          <TextField label="Password" type="password" name="password" autoComplete="current-password" />
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  );
};
