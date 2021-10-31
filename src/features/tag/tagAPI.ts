import { httpClient } from '../../app/httpClient';

export const fetchTags = () => {
  return httpClient.get('/tag');
};
