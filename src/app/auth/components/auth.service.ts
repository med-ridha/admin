import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import Admin from 'src/app/models/admin';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authUrl = "http://localhost:1337/auth/"
  helper = new JwtHelperService();
  decodedToken: any;
  currentUser: Admin = new Admin("", "", "", "");

  constructor(private http: HttpClient) { }
  checkToken(model: any, token: string): any {
    try {
      return this.http.post(this.authUrl + "checkToken", model, {
        headers: {
          'Authorization': "Bearer " + token,
        }
      }).pipe(
        map((res: any) => {
        })
      );

    } catch (err) {
      return err
    }
  }

  login(model: any) {
    return this.http.post(this.authUrl + "login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user.result == "success") {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.userToReturn))
          this.decodedToken = this.helper.decodeToken(user.token);
          this.currentUser = user.userToReturn
        } else {
          throw user.result.message
//          alert(user.result.message)
        }
      }))
  }
}
