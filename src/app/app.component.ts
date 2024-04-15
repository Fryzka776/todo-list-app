import { Component } from '@angular/core';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list-app';
  constructor(private router: Router){
    if(!localStorage.getItem('users')){
      let users: User[] = [];
      const user1 = new User(1, 'exampleUser', 'examplePassword');
      const user2 = new User(2, 'test', 'test123');
      users.push(user1, user2);
  
      localStorage.setItem('users', JSON.stringify(users));
    }
    if(!localStorage.getItem('currentUser')){
      router.navigate(['/login']);
    }
  }
}
