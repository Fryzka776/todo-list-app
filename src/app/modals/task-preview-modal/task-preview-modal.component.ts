import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-preview-modal',
  templateUrl: './task-preview-modal.component.html',
  styleUrls: ['./task-preview-modal.component.scss']
})
export class TaskPreviewModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskPreviewModalComponent>
  ) { }

  saveChanges(): void {
    this.dialogRef.close();
  }
}
