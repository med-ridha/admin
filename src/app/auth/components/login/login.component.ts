import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  }
  isError : boolean = false;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) this.route.navigate(['/'])
  }

  onSubmit(f: NgForm) {
    const loginObserver = {
      next: async () => {
        await this.route.navigate(['/']);
      },
      error: (err: any) => {
        if (err === "wrong email"){
          this.isError = true;
        }
        if (err === "wrong password"){
          this.isError = true;
        }
      }
    };
    this.authService.login(f.value).subscribe(loginObserver);
  }

}
