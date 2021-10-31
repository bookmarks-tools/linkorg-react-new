import React from 'react';
import { Card, CardContent } from '@mui/material';

import { Post } from './Post';
import type { PostType } from './PostType';

type PostListProps = {
  posts: PostType[];
  onDelete: (id: number) => void;
};

export const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  return (
    <>
      {posts.map((post) => (
        <div className="mb-10" key={post.id}>
          {/*TODO: fix width*/}
          <Card>
            <CardContent>
              <Post post={post} onDelete={() => onDelete(post.id)} />
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
};
