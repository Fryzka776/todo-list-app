import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router) {}
  
  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('currentTodo');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}
