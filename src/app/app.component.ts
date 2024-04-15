import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list-app';
  constructor(){
    if(!localStorage.getItem('users')){
      let users: User[] = [];
      const user1 = new User(1, 'exampleUser', 'examplePassword');
      const user2 = new User(2, 'test', 'test123');
      users.push(user1, user2);
  
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}
