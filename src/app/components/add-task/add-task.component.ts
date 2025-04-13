import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../model/task';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  imports: [MaterialModule, ReactiveFormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value); // Emit task data
      this.taskForm.reset();
      this.dialogRef.close(); // Close the dialog
    }
  }
}
