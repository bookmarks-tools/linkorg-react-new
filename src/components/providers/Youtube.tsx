import React, { useEffect, useState } from 'react';

import { ProviderProp } from './ProviderProp';

export const Youtube: React.FC<ProviderProp> = ({ href }) => {
  const [embedUrl, setembedUrl] = useState('');

  const updateURL = () => {
    const usrlSearch = new URL(href).search;
    const searchParams = new URLSearchParams(usrlSearch);
    const uid = searchParams.get('v');
    return `https://www.youtube.com/embed/${uid}`;
  };

  useEffect(() => {
    setembedUrl(updateURL());
  }, [href]);

  return <iframe id="ytplayer" width="640" height="360" title="" src={embedUrl} frameBorder="0" />;
};
