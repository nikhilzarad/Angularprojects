import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../model/task';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material/material.module';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, MaterialModule], // No additional imports needed here
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'priority', 'actions', 'remarks'];
  dataSource = new MatTableDataSource<Task>([]);

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshTaskList();
  }

  refreshTaskList(): void {
    this.dataSource.data = this.taskService.getTasks(); // Fetch tasks from the service
  }

  onEdit(task: Task): void {
    const dialogRef = this.dialog.open(AddTaskComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshTaskList(); // Refresh the task list after editing
      }
    });
  }

  onAddTask(): void {
    const dialogRef = this.dialog.open(AddTaskComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshTaskList(); // Refresh the task list after adding
      }
    });
  }
  onDelete(taskID: Task["id"]): void {
    this.taskService.deleteTask(taskID); // Delete the task using the service
    this.refreshTaskList(); // Refresh the task list after deletion
  }
}