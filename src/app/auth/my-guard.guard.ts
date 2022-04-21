import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './components/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate, CanActivateChild {
  constructor(private route: Router, private authService: AuthService) { }
  canActivateChild() {
    return this.verify()
  }
  canActivate(
  ) {
    return this.verify();
  }

  verify() {
    let token = localStorage.getItem('token');
    if (!token) {
      this.route.navigate(['login'])
      return false;
    }
    const loginObserver = {
      next: async () => {
        return true;
      },
      error: async (err: any) => {
        localStorage.clear();
        await this.route.navigate(['login']);
        return false
      }
    };
    this.authService.checkToken({}, localStorage.getItem('token') ?? '').subscribe(loginObserver);
    return true;
  }

}
