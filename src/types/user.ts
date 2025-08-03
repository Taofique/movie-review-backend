// types/user.ts
export type TUserCreateInput = {
  username: string;
  email: string;
  password: string;
};

export type TUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
