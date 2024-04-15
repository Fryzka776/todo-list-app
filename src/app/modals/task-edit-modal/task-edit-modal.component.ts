import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoListService } from 'src/app/services/todo-list/todo-list.service';

@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.scss']
})
export class TaskEditModalComponent implements OnInit{
  nameTodoFormControl = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<TaskEditModalComponent>, private todoListService: TodoListService) {}
  ngOnInit(): void {}

  saveChanges() {
    if(!this.data && this.nameTodoFormControl.valid){
      this.todoListService.addTodo(this.nameTodoFormControl.value).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else if (this.data && this.nameTodoFormControl.valid){
      this.todoListService.updateTodo(this.nameTodoFormControl.value, this.data).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }
}
