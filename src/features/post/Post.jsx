import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { Twitter } from '../../components/providers/Twitter';
import { Reddit } from '../../components/providers/Reddit';
import Telegram from '../../components/providers/Telegram';
import { Youtube } from '../../components/providers/Youtube';
import { Image } from '../../components/providers/Image';
import { Github } from '../../components/providers/Github';
import { Video } from '../../components/providers/Video';
import { Instagram } from '../../components/providers/Instagram';

import { httpClient } from '../../app/httpClient';
import { TagSelect } from '../tag/TsgSelect';

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
      <div className="d-flex mb-20">
        <ComponentName href={post.href} />
        <div className="ml-10">
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
