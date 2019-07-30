import { Injectable } from '@angular/core';
import {ApiUri} from '../shared/api-uri';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private route: Router) { }

  updatePassword(id: string, ancienPassword: string, newPassword: string) {
    const body = {ancienPassword, newPassword};
    return this.http.put(
      ApiUri.URI + 'user-service/api/simpleUser/password/' + id,
      body
    );
  }

  public updateProfile(id, user) {
    return this.http.put(
      ApiUri.URI + 'user-service/api/simpleUser/' + id,
      user
    );
  }
}
