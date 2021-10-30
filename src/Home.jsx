import { useState } from 'react';

import { useLocalStorage } from '@rehooks/local-storage';
import { Button, TextField } from '@mui/material';

import { Posts } from './Posts';
import { httpClient } from './httpClient';
import { detectProvider } from './providerHelper';
import { TagSelect } from './TsgSelect';

export const Home = () => {
  const [counterValue] = useLocalStorage('accessToken');
  const [url, setUrl] = useState();

  const handleAddPost = () => {
    const provider = detectProvider(url);
    httpClient
      .post('/post', {
        href: url,
        provider: provider,
        tags: ['4'],
      })
      .then(({ data }) => {
        console.log(data);
      });
  };

  return (
    <div>
      {counterValue ? (
        <div>
          <div>
            <TextField name="url" type="text" label="url" size="small" onChange={(e) => setUrl(e.target.value)} />
            <Button variant="contained" type="submit" onClick={handleAddPost}>
              add
            </Button>
          </div>
          <TagSelect />

          <Posts />
        </div>
      ) : (
        <div>Login</div>
      )}
    </div>
  );
};
