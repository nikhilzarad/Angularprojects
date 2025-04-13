import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskAddedSource = new Subject<Task>();
  taskAdded$ = this.taskAddedSource.asObservable();

  addTask(task: Task): void {
    this.taskAddedSource.next(task);
  }
}
