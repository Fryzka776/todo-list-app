import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  serverUrl = 'https://jsonplaceholder.typicode.com/todos';
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
  constructor(private http: HttpClient) { }

  getTodos(userId: number): Observable<any> {
    const options = { 
      params: new HttpParams().set('userId', userId.toString()) 
    };
    return this.http.get(this.serverUrl, options);
  }
  
  addTodo(todo: any): Observable<any> {
    const body = {
      title: todo,
      completed: false,
      userId: this.currentUser.id
    }
    return this.http.post(this.serverUrl, body);
  }

  updateTodo(todoTitle: any, todo: Task): Observable<any> {
    const body = {
      title: todoTitle,
      completed: todo.completed,
      userId: todo.userId,
      id: todo.id
    }
    return this.http.put(`${this.serverUrl}/${todo.id}`, body);
  }

  deleteTodo(todoId: any): Observable<any> {
    return this.http.delete(`${this.serverUrl}/${todoId}`);
  }
}
