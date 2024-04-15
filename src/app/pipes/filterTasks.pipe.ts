import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../interfaces/task.interface'; 

@Pipe({
  name: 'filterTasks'
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[], completed: boolean): Task[] {
    return tasks.filter(task => task.completed === completed);
  }
}