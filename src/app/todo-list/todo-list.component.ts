import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../interfaces/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskPreviewModalComponent } from '../modals/task-preview-modal/task-preview-modal.component';
import { TaskEditModalComponent } from '../modals/task-edit-modal/task-edit-modal.component';
import { TodoListService } from '../services/todo-list/todo-list.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{

  todo: Task[] = [];
  done: Task[] = [];
  selectedOption: string = 'all';
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '');

  
  constructor(private dialog: MatDialog, private todoListService: TodoListService) {}

  ngOnInit(): void {
    if(!localStorage.getItem('currentTodo')){
      this.todoListService.getTodos(this.currentUser.id).subscribe(res => {
        res.forEach((item: Task) => {
          if(item.completed){
            this.done.push(item);
          }else{
            this.todo.push(item);
          }
        });
        localStorage.setItem('currentTodo', JSON.stringify(res));
      });
    }else{
      const currentTodo = JSON.parse(localStorage.getItem('currentTodo') || '');
      currentTodo.forEach((item: Task) => {
        if(item.completed){
          this.done.push(item);
        }else{
          this.todo.push(item);
        }
      });
    }
    
  }

  changeLocalStorageCurrentTodo(todo: Task, action: string) {
    let existingArray = localStorage.getItem('currentTodo');
  
    if (existingArray) {
      let array: any[] = JSON.parse(existingArray);
      
      if (action === 'push') {
        array.push(todo);
      } else if (action === 'delete') {
        const index = array.findIndex(item => item.id === todo.id); 
        if (index !== -1) {
          array.splice(index, 1);
        }
      }else if (action === 'toggle') {
        const index = array.findIndex(item => item.id === todo.id);
        if (index !== -1) {
          array[index] = todo;
        }
      }
  
      localStorage.setItem('currentTodo', JSON.stringify(array));
    } else {
      const newArray = [todo];
      localStorage.setItem('currentTodo', JSON.stringify(newArray));
    }
  }

  toggleTodoStatus(todo: Task): void {
    todo.completed = !todo.completed;
    if (todo.completed) {
      this.todo = this.todo.filter(t => t !== todo);
      this.done.push(todo);
    } else {
      this.done = this.done.filter(t => t !== todo);
      this.todo.push(todo);
    }
    this.changeLocalStorageCurrentTodo(todo, 'toggle');
  }

  openPreviewModal(todoData: any): void {
    this.dialog.open(TaskPreviewModalComponent, {
      width: '400px',
      data: todoData
    });
  }

  openEditModal(todoData: any){
    const dialogRef = this.dialog.open(TaskEditModalComponent, {
      width: '400px',
      data: { ...todoData }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        const index = this.todo.findIndex(item => item.id === todoData.id);
        if (index !== -1) {
          this.todo[index].title = result.title;
          this.changeLocalStorageCurrentTodo(this.todo[index], 'toggle');
        }
      }
    });
  }

  openAddModal(){
    const dialogRef = this.dialog.open(TaskEditModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.todo.push(result);
        this.changeLocalStorageCurrentTodo(result, 'push');
      }
    });
  }

  delete(todoData: Task){
    this.todoListService.deleteTodo(todoData.id).subscribe(res => {
      if(!todoData.completed){
        const index = this.todo.findIndex(item => item.id === todoData.id);
        if (index !== -1) {
          this.todo.splice(index, 1);
        }
      }else{
        const index = this.done.findIndex(item => item.id === todoData.id);
        if (index !== -1) {
          this.done.splice(index, 1);
        }
      }
      this.changeLocalStorageCurrentTodo(todoData, 'delete');
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateLocalStorage(event.previousContainer.data, 'delete', event.previousIndex);
      this.updateLocalStorage(event.container.data, 'push', event.currentIndex);
    }
  }

  updateLocalStorage(todo: Task[], action: string, index: number) {
    if (action === 'push') {
      this.changeLocalStorageCurrentTodo(todo[index], 'push');
    } else if (action === 'delete') {
      this.changeLocalStorageCurrentTodo(todo[index], 'delete');
    }
  }
}
