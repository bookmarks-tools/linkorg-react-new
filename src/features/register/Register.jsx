import { Box, Button, TextField } from '@mui/material';

import { httpClient } from '../../app/httpClient';

export const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formFields = Object.fromEntries(formData);
    httpClient.post('/auth/register', formFields).then(({ data }) => {
      console.log(data);
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
          <TextField name="firstName" label="firstName" />
        </div>
        <div>
          <TextField name="lastName" label="lastName" />
        </div>
        <div>
          <TextField label="Password" type="password" name="password" autoComplete="current-password" />
        </div>
        <div>
          <TextField
            label="passwordConfirmation"
            type="passwordConfirmation"
            name="passwordConfirmation"
            autoComplete="current-password"
          />
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  );
};
