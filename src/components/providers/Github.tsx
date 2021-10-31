import React, { useEffect, useState } from 'react';

import type { ProviderProp } from './ProviderProp';

export const Github: React.FC<ProviderProp> = ({ href }) => {
  const [repoPath, setRepoPath] = useState('');

  useEffect(() => {
    setRepoPath(new URL(href).pathname.replace('/', ''));
  }, [href]);

  return (
    <div>
      <div className="github-card" data-github={repoPath} data-width="400" data-height="" data-theme="default" />
    </div>
  );
};
