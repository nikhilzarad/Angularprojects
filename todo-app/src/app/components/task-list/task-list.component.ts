import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task/task.model';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task-list',
  imports: [AddTaskComponent,FormsModule,CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterBy: 'all' | 'active' | 'completed' = 'all';
  sortBy: 'title' | 'dueDate' | 'priority' = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  editTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.applyFilter();
    this.applySort();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
    this.applyFilter();
    this.applySort();
  }

  addTask(newTask: Omit<Task, 'id' | 'completed'>): void {
    this.taskService.addTask(newTask);
    this.loadTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  toggleComplete(task: Task): void {
    this.taskService.toggleComplete(task.id);
    this.loadTasks();
  }

  edit(task: Task): void {
    this.editTask = { ...task }; // Create a copy for editing
  }

  saveEdit(): void {
    if (this.editTask) {
      this.taskService.updateTask(this.editTask);
      this.editTask = null;
      this.loadTasks();
    }
  }

  cancelEdit(): void {
    this.editTask = null;
  }

  applyFilter(): void {
    if (this.filterBy === 'all') {
      this.filteredTasks = [...this.tasks];
    } else if (this.filterBy === 'active') {
      this.filteredTasks = this.tasks.filter((task) => !task.completed);
    } else if (this.filterBy === 'completed') {
      this.filteredTasks = this.tasks.filter((task) => task.completed);
    }
    this.applySort(); // Apply sorting after filtering
  }

  applySort(): void {
   
  }

  setSortBy(sortBy: 'title' | 'dueDate' | 'priority'): void {
    if (this.sortBy === sortBy) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortDirection = 'asc';
    }
    this.applySort();
  }
}