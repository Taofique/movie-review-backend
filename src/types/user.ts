// types/user.ts
export type TUserCreateInput = {
  username: string;
  email: string;
  password: string;
  avatarUrl?: string;
};

export type TUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
