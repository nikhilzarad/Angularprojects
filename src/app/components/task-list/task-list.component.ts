import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/material/material.module';
import { CommonModule } from '@angular/common';
import { Task } from '../../model/task';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [MaterialModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'priority', 'actions'];
  dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.taskAdded$.subscribe((task: Task) => {
      this.dataSource.data = [...this.dataSource.data, task]; // Update the table
    });
  }

  taskDataRecieved(task: any): void {
    // Append the new task to the dataSource
    this.dataSource.data = [...this.dataSource.data, task];
  }
}
