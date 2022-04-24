import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

  static users: User[] = [];
  token: string = localStorage.getItem('token') ?? "";

  constructor(
    private userService: UsersService,
  ) {
  }

  getStaticUsers() {
    return ShowUsersComponent.users;
  }

  ngOnInit(): void {
    if (UsersComponent.users.length > 0) {
      ShowUsersComponent.users = UsersComponent.users
      console.log(this.getStaticUsers())
    } else {
      this.userService.getUsers(this.token).subscribe((result: any) => {
        if (result.code == 0) {
          ShowUsersComponent.users = result.message;
          console.log(this.getStaticUsers())
        } else {
          console.log(result.message);
        }
      })

    }
  }
  delete(userId: string) {
    let answer = confirm("are you sure you want to delete this user?")
    if (answer) {
      this.userService.deleteUser(userId, this.token).subscribe((result: any) => {
        if (result.code == 0) {
          alert("user deleted!")
          this.userService.getUsers(this.token).subscribe((result: any) => {
            if (result.code == 0) {
              ShowUsersComponent.users = result.message;
              UsersComponent.users = result.message;
              console.log(this.getStaticUsers())
            } else {
              console.log(result.message);
            }
          })
        }
      })
    } else {
      return
    }
  }
}
