import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPreviewModalComponent } from './task-preview-modal.component';

describe('TaskPreviewModalComponent', () => {
  let component: TaskPreviewModalComponent;
  let fixture: ComponentFixture<TaskPreviewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskPreviewModalComponent]
    });
    fixture = TestBed.createComponent(TaskPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
