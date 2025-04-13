import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../model/task/task.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @Output() taskAdded = new EventEmitter<Omit<Task, 'id' | 'completed'>>();
  newTask: Omit<Task, 'id' | 'completed'> = { title: '', description: '', dueDate: undefined, priority: 'low' };

  addTask(): void {
    if (this.newTask.title.trim()) {
      this.taskAdded.emit(this.newTask);
      this.newTask = { title: '', description: '', dueDate: undefined, priority: 'low' };
    }
  }
}