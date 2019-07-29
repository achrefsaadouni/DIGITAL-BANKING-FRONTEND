import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Compte} from '../../public/shared/models/Compte';
import {ApiUri} from '../../public/shared/api-uri';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // tslint:disable-next-line:variable-name
  private _markedAccount: Compte;

  constructor(private http: HttpClient, private route: Router) {
  }

  public gelAll() {
    return this.http.get<Compte[]>(
      ApiUri.URI + 'account-service/api/accounts');
  }
  public traiter(id, etat) {
    return this.http.put(
      ApiUri.URI + 'account-service/api/account/' + id + '/' + etat,
      null
    );
  }
  get markedAccount(): Compte {
    return this._markedAccount;
  }

  set markedAccount(value: Compte) {
    this._markedAccount = value;
  }
}
