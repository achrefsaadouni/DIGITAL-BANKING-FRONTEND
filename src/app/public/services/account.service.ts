import { Injectable } from '@angular/core';
import {ApiUri} from '../shared/api-uri';
import {HttpClient} from '@angular/common/http';
import {Compte} from '../shared/models/Compte';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public getAccounts(email) {
    return this.http.get<Compte[]>(
      ApiUri.URI + 'account-service/api/accounts/simpleUser/' + email,
    );
  }
    public createAccount(compte: Compte) {
      return this.http.post(
        ApiUri.URI + 'account-service/api/accounts/simpleUser', compte,
      );
    }
}
