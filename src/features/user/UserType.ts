type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserInfo = {
  expiresIn: string;
  accessToken: string;
  user: User;
};
