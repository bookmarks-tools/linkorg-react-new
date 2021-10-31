import React, { useEffect, useState } from 'react';

import { ProviderProp } from './ProviderProp';

export const Telegram: React.FC<ProviderProp> = ({ href }) => {
  const [postPath, setPostPath] = useState('');

  useEffect(() => {
    setPostPath(`${href}?embed=1`);
  }, [href]);

  const styles = {
    width: '100%',
    frameBorder: '0',
    scrolling: 'no',
    border: 'none',
    overflow: 'hidden',
  };

  return <iframe src={`${href}?embed=1`} height="476px" id="telegram-post" style={styles}></iframe>;
};

export default Telegram;
