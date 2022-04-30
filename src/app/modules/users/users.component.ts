import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import User from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { ShowUsersComponent } from './show-users/show-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  static users: User[] = [];
  isSearch: boolean = true;
  url: NavigationEnd;

  constructor(
    private userService: UsersService, private route: Router
  ) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token') ?? "";
    if (this.route.url == '/users/show') {
      this.isSearch = true;
    } else {
      this.isSearch = false;
    }
    this.userService.getUsers(token).subscribe((result: any) => {
      if (result.code == 0) {
        console.log(result);
        UsersComponent.users = result.message;
      } else {
        console.log(result.message);
      }
    })
    this.route.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.url = val;
        if (this.url.urlAfterRedirects === '/users/show') {
          this.isSearch = true;
        } else {
          this.isSearch = false;
        }
      }
    });
  }


  findUser(search: any) {
    ShowUsersComponent.users = UsersComponent.users.filter(user => user.name.includes(search))
  }
}
