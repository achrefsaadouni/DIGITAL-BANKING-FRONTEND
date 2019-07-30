import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Compte} from '../shared/models/Compte';
import {ApiUri} from '../shared/api-uri';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private http: HttpClient, private route: Router) {
  }

  public createAccount(compte: Compte) {
  return this.http.post(
    ApiUri.URI + 'account-service/account', compte,
  );
}

}
