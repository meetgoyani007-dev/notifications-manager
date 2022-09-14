import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router) {
   }

   canActivate() {
    if (localStorage.getItem('u_id')) {
      // if logged in, then return true
      return true;
    }
    // if not logged in, then redirect to login page with the return url and return false
    this.router.navigate(['/']);
    return false;
  }
}
