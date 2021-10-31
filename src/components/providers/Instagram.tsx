import React from 'react';

import { ProviderProp } from './ProviderProp';

export const Instagram: React.FC<ProviderProp> = ({ href }) => {
  return <blockquote className="instagram-media" data-instgrm-permalink={href} data-instgrm-version="12"></blockquote>;
};
