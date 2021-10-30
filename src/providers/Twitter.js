import { useEffect } from 'react';

export function Twitter({ href }) {
  useEffect(() => {
    window.twttr.widgets.load();
  }, []);

  return (
    <blockquote className="twitter-tweet">
      <a href={href}></a>
    </blockquote>
  );
}
