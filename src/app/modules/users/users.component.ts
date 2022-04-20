import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UsersService,
  ) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token') ?? "";
    this.userService.getUsers(token).subscribe((result: any) => {
      if (result.code == 0) {
        console.log(result);
        this.users = result.message;
        console.log(this.users[0])
        this.users.forEach(val => this.temp.push(Object.assign({}, val)));
      } else {
        console.log(result.message);
      }
    })
  }

  printUser(_id: string) {
    for (let user of this.users) {
      if (user._id == _id) console.log(user);
    }
  }

  search: string = ""
  temp: User[] = [];


  onSearchChange(value: any) {
  }

}
