import type { TagType } from '../tag/TagType';

export type PostType = {
  id: number;
  href: string;
  provider: string;
  tags: TagType[];
};
