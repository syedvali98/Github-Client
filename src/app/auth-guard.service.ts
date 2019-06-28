import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private http: HttpService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(this.http.isLoggedIn==false){
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
