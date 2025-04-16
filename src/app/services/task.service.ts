import { Injectable } from '@angular/core';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = []; // Store tasks in memory

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    task.id = Date.now(); // Assign a unique ID using the current timestamp
    task.id = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1; // Increment ID by 1, starting from 1
    this.tasks.push(task);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }
  deleteTask(id: number): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  
}
