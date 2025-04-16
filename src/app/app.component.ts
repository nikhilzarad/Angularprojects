import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material/material.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { Task } from './model/task';

@Component({
  selector: 'app-root',
  imports: [MaterialModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud_App-with-localstorage';

 
}
