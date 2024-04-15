import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  loginError: boolean = false;

  constructor(private router: Router) { }
  ngOnInit(): void {}

  validatePassword(password: any, passwordHash:any): boolean {
    return bcrypt.compareSync(password, passwordHash);
  }

  onSubmit() {
    if (this.loginFormControl.valid && this.passwordFormControl.valid) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.username === this.loginFormControl.value);
      if (user) {
        console.log(user, this.passwordFormControl.value)
        if (this.validatePassword(this.passwordFormControl.value, user.passwordHash)) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigateByUrl('/todo-list');
        } else {
          this.loginError = true;
        }
      } else {
        this.loginError = true;
      }
    }
  }
}