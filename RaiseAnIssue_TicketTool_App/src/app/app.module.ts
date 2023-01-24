import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './pages/department/department.component';
import { DeptLayoutComponent } from './pages/dept-layout/dept-layout.component';
import { EmpLayoutComponent } from './pages/emp-layout/emp-layout.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { LoginComponent } from './pages/login/login.component';
import { TicketsComponent } from './pages/tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    DeptLayoutComponent,
    EmpLayoutComponent,
    EmployeeComponent,
    LayoutComponent,
    LeavesComponent,
    LoginComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
