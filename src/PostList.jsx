import { useEffect, useState } from 'react';

import { httpClient } from './httpClient';
import { Post } from './Post';

export const PostList = ({ posts, onDelete }) => {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={() => onDelete(post.id)} />
      ))}
    </>
  );
};
