export interface ICredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  IsSuccess: boolean;
  ErrorMessage: string | null;
  User: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
    createdOn: string;
  };
}