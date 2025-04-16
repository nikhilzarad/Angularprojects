import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../model/task';
import { TaskService } from '../../services/task.service';
import { MaterialModule } from '../../material/material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule], // No additional imports needed here
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data; // Determine if it's edit mode
    this.taskForm = this.fb.group({
      id: [this.data?.id || null],
      title: [this.data?.title || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      dueDate: [this.data?.dueDate || '', Validators.required],
      priority: [this.data?.priority || '', Validators.required],
      remarks: [this.data?.remarks || ''],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;

      if (this.isEditMode) {
        this.taskService.updateTask(task); // Update the task
      } else {
        this.taskService.addTask(task); // Add a new task
      }

      this.dialogRef.close(true); // Notify the parent component
    }
  }
}
