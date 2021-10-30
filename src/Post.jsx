import { Twitter } from './providers/Twitter';
import { Reddit } from './providers/Reddit';
import Telegram from './providers/Telegram';
import { Youtube } from './providers/Youtube';
import { Image } from './providers/Image';
import { Github } from './providers/Github';
import { Video } from './providers/Video';
import { Instagram } from './providers/Instagram';

export const Post = ({ post }) => {
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

  return <ComponentName href={post.href} />;
};
