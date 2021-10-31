import React from 'react';

import { ProviderProp } from './ProviderProp';

export const Image: React.FC<ProviderProp> = ({ href }) => {
  return <img src={href} alt=""></img>;
};
