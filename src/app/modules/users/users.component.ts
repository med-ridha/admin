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
  userId: string = "";
  user: boolean = false;
  token: string = localStorage.getItem('token') ?? "";

  constructor(
    private userService: UsersService, private route: Router
  ) {
  }

  ngOnInit(): void {
    if (this.route.url.match('/[a-zA-z]*/[a-zA-z]*/[0-9]*/*')) {
      this.userId = this.route.url.split('/')[3];
      this.user = true;
      console.log(this.userId)
    } else {
      this.user = false;
      this.userId = "";
    }
    if (this.route.url == '/users/show') {
      this.isSearch = true;
    } else {
      this.isSearch = false;
    }
    this.userService.getUsers(this.token).subscribe((result: any) => {
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
        if (this.route.url.match('/[a-zA-z]*/[a-zA-z]*/[0-9]*/*')) {
          this.userId = this.route.url.split('/')[3];
          this.user = true;
          console.log(this.userId)
        } else {
          this.user = false;
          this.userId = "";
        }
      }
    });
  }

  delete(userId: any) {
    let response = confirm("Etes-vous sur de vouloir supprimer cet utilisateur")
    if (response) {
      this.userService.deleteUser(userId, this.token).subscribe((result: any) => {
        if (result.code == 0) {
          alert("Utilisateur supprimer")
          this.route.navigate(['users/show'])
        } else {
          alert("something went wrong")
        }
      })
    }
  }

  findUser(search: any) {
    ShowUsersComponent.users = UsersComponent.users.filter(user => user.name.includes(search))
  }
}
