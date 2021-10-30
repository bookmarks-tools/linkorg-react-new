import { useEffect } from 'react';

import { httpClient } from './httpClient';

export const Posts = () => {
  useEffect(() => {
    httpClient.get('/post').then(({ data }) => {
      console.log(data);
    });
  }, []);

  return <div>posts</div>;
};
