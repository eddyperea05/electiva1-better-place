export interface UserDataRegister {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  numberPhone: string;
  isOwner: boolean;
  password: string;
}

export interface UserDataLogin {
  email: string;
  password: string;
}