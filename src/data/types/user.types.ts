import { ID, ICreatedOn } from "./core.types";


export interface IUser extends ID, ICreatedOn {
  username: string;
  firstName: string;
  lastName: string;

}