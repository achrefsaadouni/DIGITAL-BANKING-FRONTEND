import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiUri} from './api-uri';
import {User} from '../models/User';
import {Roles} from '../models/Roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLoggedIn: User;
  role = new Roles();
  constructor(private http: HttpClient) { }
  public authenticateMe(email: string, password: string) {
    const body = { email, password };
    console.log('Sending Authorization request ..');
    return  this.http.post<User>(
      ApiUri.URI + 'api/auth/login',
      body,
    );
  }
  public registerMe(user: User) {
    const body = user ;
    console.log('Sending Authorization request ..');
    return  this.http.post(
      ApiUri.URI + 'api/auth/register',
      body,
    );
  }
  getUser() {
    return this.userLoggedIn;
  }
  setUser(user: User) {
    this.userLoggedIn = user;
  }
}
