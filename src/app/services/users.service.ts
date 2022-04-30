import { Injectable } from '@angular/core';
import { WebService } from './web.service'

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private webService: WebService) { }
  getUsers(token: string) {
    return this.webService.get('users/all', token);
  }

  getUserCollabs(email: string, token: string) {
    return this.webService.get(`users/one/collabs/${email}`, token);
  }

  getUserSearchH(email: string, token: string) {
    return this.webService.get(`users/one/searchH/${email}`, token);
  }

  getUserFavorit(email: string, token: string) {
    return this.webService.get(`users/one/favorit/${email}`, token);
  }
  getUser(userId: string, token: string) {
    return this.webService.get(`users/one/${userId}`, token);
  }

  deleteUser(userId: string, token: string){
    return this.webService.delete("users/delete/", {id: userId}, token)
  }
}
