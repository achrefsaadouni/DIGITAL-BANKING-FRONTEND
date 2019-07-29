import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../public/shared/models/User';
import {ApiUri} from '../../public/shared/api-uri';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  // tslint:disable-next-line:variable-name
  private _markerUser: User;

  constructor(private http: HttpClient, private route: Router) {
  }

  public gelAll() {
    return this.http.get<User[]>(
      ApiUri.URI + 'user-service/api/user');
  }

  public getuser(id) {
    return this.http.get<User>(
      ApiUri.URI + 'user-service/api/user/' + id);
  }
  public update(id, user) {
    return this.http.put(
      ApiUri.URI + 'user-service/api/user/' + id,
      user
    );
  }
  public ban(id) {
    return this.http.put(
      ApiUri.URI + 'user-service/api/user/ban/' + id,
      null
    );
  }

  public restorer(id) {
    return this.http.put(
      ApiUri.URI + 'user-service/api/user/unban/' + id,
      null
    );
  }

  get markerUser(): User {
    return this._markerUser;
  }

  set markerUser(value: User) {
    this._markerUser = value;
  }
}
