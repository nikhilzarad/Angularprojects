import { Injectable } from '@angular/core';
import { Task } from '../model/task/task.model';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  private readonly STORAGE_KEY = 'todos';
  private nextId = 1;

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem(this.STORAGE_KEY);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      if (this.tasks.length > 0) {
        this.nextId = Math.max(...this.tasks.map(task => task.id)) + 1;
      }
    } else {
      this.tasks = [];
    }
  }

  private saveTasks(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return [...this.tasks]; // Return a copy to prevent direct modification
  }

  addTask(task: Omit<Task, 'id' | 'completed'>): void {
    this.tasks.push({ id: this.nextId++, ...task, completed: false });
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasks();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  toggleComplete(id: number): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
    }
  }
}