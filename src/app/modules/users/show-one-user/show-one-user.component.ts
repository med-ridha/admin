import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import Collab from 'src/app/models/collab';
import User from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-show-one-user',
  templateUrl: './show-one-user.component.html',
  styleUrls: ['./show-one-user.component.scss']
})
export class ShowOneUserComponent implements OnInit {
  user: User = new User("", "", "", [], "", "", "", "", "", "", "", "", [], "");
  collab: Collab = new Collab("", [], new Date(), "");
  listUsersCollab: any = [];
  constructor(private route: ActivatedRoute, private userService: UsersService) { }
  token: string = localStorage.getItem('token') ?? ''
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let userId = params['id'];
      this.userService.getUser(userId, this.token).subscribe((result: any) => {
        if (result.code == 0) {
          this.user = result.message;
          this.listUsersCollab = [] 
          this.userService.getUserCollabs(this.user.email, this.token).subscribe((result: any) => {
            if (result.code == 0) {
              this.collab = result.message.collab;
              this.listUsersCollab = result.message.listUsers;
              for (let i of result.message.listUsers) {
                console.log(i)
              }
            }
          })
        } else {
          alert('something went wrong');
        }
      })
    })
  }
}
