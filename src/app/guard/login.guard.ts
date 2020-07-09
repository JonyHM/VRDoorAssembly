import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {

    if (this.currentUserService.isLogged()) {
      this.router.navigate(['screen']);
      return false;
    }
    return true;
  }
}

