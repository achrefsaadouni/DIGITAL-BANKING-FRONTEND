import {Roles} from './Roles';
import {Compte} from './Compte';

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
  comptes: Compte[];

  enabled: boolean;
  activated: boolean;
}
