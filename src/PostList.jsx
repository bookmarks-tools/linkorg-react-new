import { useEffect, useState } from 'react';

import { httpClient } from './httpClient';
import { Post } from './Post';

export const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    httpClient.get('/post').then(({ data }) => {
      console.log(data);
      setPosts(data);
    });
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
