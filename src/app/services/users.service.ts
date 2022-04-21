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

  getUser(userId: string, token: string) {
    return this.webService.get(`users/${userId}`, token);
  }
  deleteUser(payload: any) {
    return this.webService.delete('users/delete/' + payload);
  }
  updateUser(userId: string, payload: any) {
    return this.webService.put('users/update/' + userId, payload);
  }
}
