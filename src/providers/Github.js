import { useEffect, useState } from 'react';

export function Github({ href }) {
  const [repoPath, setRepoPath] = useState([]);

  useEffect(() => {
    setRepoPath(new URL(href).pathname.replace('/', ''));
  }, [href]);

  return (
    <div>
      <div className="github-card" data-github={repoPath} data-width="400" data-height="" data-theme="default" />
    </div>
  );
}
