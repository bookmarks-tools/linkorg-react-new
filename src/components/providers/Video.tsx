import React from 'react';

import { ProviderProp } from './ProviderProp';

export const Video: React.FC<ProviderProp> = ({ href }) => {
  return <video controls src={href}></video>;
};
