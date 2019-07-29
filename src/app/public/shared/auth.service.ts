import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiUri} from './api-uri';
import {User} from './models/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLoggedIn: User;

  constructor(private http: HttpClient, private route: Router) {
  }


  public authenticateMe(email: string, password: string) {
    const body = {email, password};
    return this.http.post<User>(
      ApiUri.URI + 'api/auth/login',
      body,
    );
  }

  public registerMe(user: User) {
    return this.http.post(
      ApiUri.URI + 'api/auth/register',
      user,
    );
  }

  public logout() {
    this.userLoggedIn = null;
    return this.route.navigate(['login']);
  }

  getUser() {
    return this.userLoggedIn;
  }

  setUser(user: User) {
    this.userLoggedIn = user;
  }
}
