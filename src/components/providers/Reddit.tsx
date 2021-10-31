import React from 'react';

import { ProviderProp } from './ProviderProp';

export const Reddit: React.FC<ProviderProp> = ({ href }) => {
  return (
    <blockquote className="reddit-card">
      <a href={href}></a>
    </blockquote>
  );
};
