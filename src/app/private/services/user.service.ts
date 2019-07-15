import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../public/shared/models/User';
import {ApiUri} from '../../public/shared/api-uri';
import {AuthService} from '../../public/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient , private route: Router, private service: AuthService) { }
  public gelAll() {
    return  this.http.get<User[]>(
      ApiUri.URI + 'user-service/api/user');
  }
}
