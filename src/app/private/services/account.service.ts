import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Compte} from '../../public/shared/models/Compte';
import {ApiUri} from '../../public/shared/api-uri';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private route: Router) {
  }

  public gelAll() {
    return this.http.get<Compte[]>(
      ApiUri.URI + 'account-service/api/account');
  }
}
