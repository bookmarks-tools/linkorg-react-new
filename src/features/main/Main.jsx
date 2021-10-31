import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { TagSelect } from '../tag/TsgSelect';
import { PostList } from '../post/PostList';
import { httpClient } from '../../app/httpClient';
import { detectProvider } from '../../providerHelper';
import { useAppDispatch } from '../../app/hooks';
import { getTags } from '../tag/tagSlice';

export const Main = () => {
  const [url, setUrl] = useState();
  const [postTags, setPostTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsData, setPostsData] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, []);

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
    setPostTags(tags);
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter((post) => postId !== post.id));
  };

  return (
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
  );
};
