import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, IconButton, Pagination, TextField, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { TagSelect } from '../tag/TsgSelect';
import { PostList } from '../post/PostList';
import { httpClient } from '../../app/httpClient';
import { detectProvider } from './providerHelper';
import { useAppDispatch } from '../../app/hooks';
import { getTags } from '../tag/tagSlice';
import { TagType } from '../tag/TagType';
import { PostType } from '../post/PostType';
import type { PaginationType } from '../../app/PaginationType';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
  },
}));

export const Main = () => {
  const [url, setUrl] = useState('');
  const [provider, setProvider] = useState<string | undefined>('');
  const [postTags, setPostTags] = useState<TagType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [tagsForFilter, setTagsForFilter] = useState<TagType[]>([]);
  const [page, setPage] = useState(1);
  const [postsData, setPostsData] = useState<PaginationType<PostType> | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, []);

  useEffect(() => {
    httpClient
      .get('/post', {
        params: {
          tags: tagsForFilter.map((tag) => tag.id),
          page,
        },
      })
      .then(({ data }) => {
        setPostsData(data);
        setPosts(data.items);
      });
  }, [tagsForFilter, page]);

  const handleAddPost = () => {
    httpClient
      .post('/post', {
        href: url,
        provider,
        tags: postTags.map((tag) => tag.id),
      })
      .then(({ data }) => {
        setPosts([data, ...posts]);
        setUrl('');
        setPostTags([]);
      });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleTagChange = (tags: TagType[]) => setPostTags(tags);

  const handleDelete = (postId: number) => {
    setPosts(posts.filter((post) => postId !== post.id));
  };

  const handleTagFilterChange = (tags: TagType[]) => setTagsForFilter(tags);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uri = event.target.value;
    setUrl(uri);
    setProvider(detectProvider(url));
  };

  return (
    <div>
      <div className="mb-25">
        <Card>
          <CardContent>
            <div className="d-flex mb-10">
              <div className="flex-1 mr-10">
                <TextField
                  fullWidth
                  name="url"
                  value={url}
                  type="text"
                  label="url"
                  size="small"
                  onChange={handleUrlChange}
                />
              </div>
              <div>
                <HtmlTooltip
                  title={
                    <>
                      <Typography color="inherit">Supported sites:</Typography>
                      <ul>
                        <li>Twitter</li>
                        <li>Reddit</li>
                        <li>YouTube</li>
                        <li>GitHub</li>
                        <li>Instagram</li>
                        <li>Telegram</li>
                        <li>and url to video or image</li>
                      </ul>
                    </>
                  }
                >
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                </HtmlTooltip>
              </div>
              <div className="ml-auto">
                <Button variant="contained" type="submit" onClick={handleAddPost} disabled={!provider}>
                  add
                </Button>
              </div>
            </div>
            <TagSelect onTagsChange={handleTagChange} selected={postTags} />
          </CardContent>
        </Card>
      </div>

      <div className="mb-25">
        <Card>
          <CardContent>
            <div className="d-flex">
              <div className="mr-15 self-center">
                <Typography component="div">Filter:</Typography>
              </div>
              <div>
                <TagSelect onTagsChange={handleTagFilterChange} selected={tagsForFilter} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-25">
        <PostList posts={posts} onDelete={handleDelete} />
      </div>

      <div className="mb-25 d-flex justify-center">
        <Card>
          <CardContent>
            <Pagination count={postsData?.meta?.totalPages} page={page} onChange={handleChange} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
