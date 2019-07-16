import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../public/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate  {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.authService.getUser()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }

  }

}
