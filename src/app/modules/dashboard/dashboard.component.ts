import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pieChart: any = [];
  users: any = [];
  searchH: any = [];

  constructor(private documentService: DocumentsService, private userService: UsersService) { }

  token: string = localStorage.getItem('token') ?? ''
  ngOnInit(): void {
    this.documentService.getAllSearch(this.token).subscribe((result: any) => {
      if (result.code == 0) {
        this.userService.getUsers(this.token).subscribe((r: any) => {
          if (result.code == 0) {
            this.users = r.message;
            this.searchH = result.message;
          }
        })
      }
    })
  }
  getUserId(value: string): string {
    for (let user of this.users) {
      if (user.email == value) return user._id
    }
    return "";
  }
  getSearchTerm(value: string): string {
    console.log(value);
    return JSON.parse(value).search;
  }

  getExacte(value: string): string {
    return JSON.parse(value).exacte ? "oui" : "non"
  }

  getDate(value: string): string {
    return value.split("T")[0];
  }

  getAboutie(value: boolean): string {
    return value ? "Aboutie" : "Non aboutie"
  }
}
