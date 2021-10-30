import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { Twitter } from './providers/Twitter';
import { Reddit } from './providers/Reddit';
import Telegram from './providers/Telegram';
import { Youtube } from './providers/Youtube';
import { Image } from './providers/Image';
import { Github } from './providers/Github';
import { Video } from './providers/Video';
import { Instagram } from './providers/Instagram';

import { httpClient } from './httpClient';
import { TagSelect } from './TsgSelect';

export const Post = ({ post, onDelete }) => {
  const providers = {
    twitter: Twitter,
    reddit: Reddit,
    telegram: Telegram,
    youtube: Youtube,
    image: Image,
    github: Github,
    video: Video,
    instagram: Instagram,
  };

  const ComponentName = providers[post.provider];

  const handleDelete = () => {
    httpClient.delete(`/post/${post.id}`).then(onDelete);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post.href);
  };

  const handleTagChange = (tags) => {
    console.log(tags);
    httpClient
      .put(`/post/${post.id}`, {
        ...post,
        tags: tags.map((tag) => tag.id),
      })
      .then(({ data }) => {
        console.log(data);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ComponentName href={post.href} />
        <div>
          <div>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
          <div>
            <IconButton onClick={handleCopy}>
              <ContentCopyIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <TagSelect selected={post.tags} onTagsChange={handleTagChange} />
    </div>
  );
};
