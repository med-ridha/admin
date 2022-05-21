import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isEmail: boolean = true;
  email: string;
  isEmailError: boolean = false;
  isToken: boolean = false;
  isTokenError: boolean = false;
  isPasswordError: boolean = false;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  checkEmail(email: string) {
    const emailObserver = {
      next: async () => {
        this.isEmail = false;
        this.isToken = true;
      },
      error: (err: any) => {
        if (err === "email not found") {
          this.isEmailError = true;
        }
      }
    };
    this.authService.checkEmail(email).subscribe(emailObserver);

  }

  checkToken(token: string, email: string, password: string) {
    const emailObserver = {
      next: async () => {
        this.route.navigate(['/login']);
      },
      error: (err: any) => {
        if (err === "invalid token") {
          this.isTokenError = true;
        }
      }
    };
    this.authService.checkResetToken(token, email, password).subscribe(emailObserver);
  }

  onSubmit(form: NgForm) {
    if (this.isEmail == true) {
      this.email = form.value.email;
      this.checkEmail(this.email);
    }
    if (this.isToken == true) {
      if (form.value.password !== form.value.confirmpas) {
        this.isPasswordError = true;
        return;
      }
      this.isPasswordError = false;
      this.checkToken(form.value.token, this.email, form.value.password);
    }
  }
}
