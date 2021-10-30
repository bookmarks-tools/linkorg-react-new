import { useEffect, useState } from 'react';

import { useLocalStorage } from '@rehooks/local-storage';
import { Button, TextField } from '@mui/material';

import { PostList } from './PostList';
import { httpClient } from './httpClient';
import { detectProvider } from './providerHelper';
import { TagSelect } from './TsgSelect';

export const Home = () => {
  const [counterValue] = useLocalStorage('accessToken');
  const [url, setUrl] = useState();
  const [postTags, setPostTags] = useState([]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    httpClient.get('/post').then(({ data }) => {
      console.log(data);
      setPosts(data);
    });
  }, []);

  const handleAddPost = () => {
    const provider = detectProvider(url);
    httpClient
      .post('/post', {
        href: url,
        provider: provider,
        tags: postTags.map((tag) => tag.id),
      })
      .then(({ data }) => {
        setPosts([data, ...posts]);
      });
  };

  const handleTagChange = (tags) => {
    console.log(tags);
    setPostTags(tags);
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => postId !== post.id));
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
          <TagSelect onTagsChange={handleTagChange} />

          <PostList posts={posts} onDelete={handleDelete} />
        </div>
      ) : (
        <div>Login</div>
      )}
    </div>
  );
};
