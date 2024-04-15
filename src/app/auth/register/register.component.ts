import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  loginFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  rePasswordFormControl = new FormControl('', [Validators.required]);
  localStorageKey = 'users';

  constructor(private router: Router) { }

  onSubmit() {
    if(this.rePasswordFormControl.value == this.passwordFormControl.value){
      if (this.loginFormControl.valid && this.passwordFormControl.valid) {
        this.register(this.loginFormControl.value, this.passwordFormControl.value)
        this.router.navigate(['/todo-list']);
      }
    }
     else {
      console.error('Nieprawidłowe dane logowania.');
    }
  }

  register(username: any, password: any): User {
    const id = this.getNextId();
    const newUser = new User(id, username, password);
    const users = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]') as User[];
    users.push(newUser);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return newUser;
  }

  getNextId(): number {
    const users = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]') as User[];
    if (users.length === 0) {
      return 11;
    }
    const maxId = Math.max(...users.map(user => user.id));
    return maxId <= 10 ? 11 : maxId + 1;
  }
}