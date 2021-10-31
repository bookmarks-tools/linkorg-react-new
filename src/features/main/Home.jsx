import { useEffect, useState } from 'react';

import { Button, TextField } from '@mui/material';

import { PostList } from '../post/PostList';
import { httpClient } from '../../app/httpClient';
import { detectProvider } from '../../providerHelper';
import { TagSelect } from '../tag/TsgSelect';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { setTags } from '../tag/tagSlice';
import { useAppDispatch } from '../../app/hooks';

export const Home = () => {
  const [accessToken] = useLocalStorage('accessToken');
  const [url, setUrl] = useState();
  const [postTags, setPostTags] = useState([]);

  const [posts, setPosts] = useState([]);
  const [postsData, setPostsData] = useState(null);

  useEffect(() => {
    httpClient.get('/post').then(({ data }) => {
      console.log(data);
      setPostsData(data);
      setPosts(data.items);
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

  console.log(posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    httpClient.get('/tag').then(({ data }) => {
      console.log(data);
      dispatch(setTags(data));
    });
  }, []);

  return (
    <div className="wrapper">
      {accessToken ? (
        <div>
          <div className="mb-25">
            <div className="d-flex mb-10">
              <div className="flex-1 mr-10">
                <TextField
                  fullWidth
                  name="url"
                  type="text"
                  label="url"
                  size="small"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="ml-auto">
                <Button variant="contained" type="submit" onClick={handleAddPost}>
                  add
                </Button>
              </div>
            </div>
            <TagSelect onTagsChange={handleTagChange} />
          </div>

          <PostList posts={posts} onDelete={handleDelete} />
        </div>
      ) : (
        <div>Login</div>
      )}
    </div>
  );
};
