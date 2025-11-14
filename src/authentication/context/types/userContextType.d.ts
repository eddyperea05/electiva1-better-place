export interface userData {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string | null;
  numberPhone: string;
  userImage: string;
  cedulaImage: string;
  isOwner: boolean;
}

export interface userDataContext {
  userData: userData;
  setUserData: React.Dispatch<React.SetStateAction<userData | null>>;
}
