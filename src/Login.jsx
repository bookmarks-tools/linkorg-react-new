import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { writeStorage } from '@rehooks/local-storage';

export const Login = () => {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    axios.post('http://localhost:3000/api/auth/login', formFields).then(({ data }) => {
      writeStorage('accessToken', data.accessToken);
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
