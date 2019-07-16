import {Roles} from './Roles';

export class User {
  token: string;
  // tslint:disable-next-line:variable-name
  _id: string;
  firstName: string;
  password: string;
  lastName: string;
  email: string;
  createdDate: Date;
  roles: Roles[];
  enabled: boolean;
}
