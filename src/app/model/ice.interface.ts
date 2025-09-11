export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
}

export interface ICurrentUser {
  id: number;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  token: string;
}
