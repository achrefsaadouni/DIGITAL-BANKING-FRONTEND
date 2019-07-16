import {Roles} from './Roles';

export class User {
  token: string;
  _id: string;
  firstName: string;
  password: string;
  lastName: string;
  email: string;
  createdDate: Date;
  roles: Roles[];
  enabled: boolean;
}
