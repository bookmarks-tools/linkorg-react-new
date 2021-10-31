const providers: Record<string, RegExp> = {
  twitter: RegExp('twitter'),
  reddit: RegExp('reddit'),
  youtube: RegExp('youtube'),
  github: RegExp('github'),
  instagram: RegExp('instagram'),
  telegram: RegExp('t.me'),
  image: RegExp('.(gif|jpg|jpeg|tiff|png)'),
  video: RegExp('.mp4'),
};

export const detectProvider = (url: string) => {
  return Object.keys(providers).find((provider) => providers[provider].test(url));
};
