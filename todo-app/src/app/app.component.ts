import { Component } from '@angular/core';
import { TaskListComponent } from "./components/task-list/task-list.component";

@Component({
  selector: 'app-root',
  template: `
    <app-task-list></app-task-list>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [TaskListComponent],
})
export class AppComponent {
  title = 'todo-app';
}