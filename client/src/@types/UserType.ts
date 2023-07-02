export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  fullname: string;
  email: string;
  password: string;
  //avatar: string;
};

/* export type Welcome = {
    success: boolean;
    message: string;
    payload: UserType[];
} */

export type UserType = {
  _id: string;
  fullname: string;
  email: string;
  password: string;
  image?: string;
  isBanned: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  avatar: string;
};
