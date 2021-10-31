import React, { useEffect } from 'react';

import { ProviderProp } from './ProviderProp';

export const Twitter: React.FC<ProviderProp> = ({ href }) => {
  useEffect(() => {
    // @ts-ignore
    window.twttr.widgets.load();
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <a href={href}></a>
    </blockquote>
  );
};
