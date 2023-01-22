import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  isSidePanel: boolean = false;
  employeeArray: any[] = [];
  employeeObj: any = {
    employeeId: 0,
    fName: '',
    lName: '',
    email: '',
    contact: '',
    salary: '',
  };
  constructor() {
    this.isSidePanel = false;
  }
  ngOnInit(): void {
    this.getempDetail();
  }
  onedit(emp: any) {
    this.employeeArray = emp;
  }

  onAdd() {
    this.isSidePanel = true;
  }
  onClose() {
    this.isSidePanel = false;
  }
  onsave() {
    this.employeeArray.push(this.employeeObj);
    this.employeeObj.employeeId = this.employeeArray.length + 1;
    localStorage.setItem('empdetail', JSON.stringify(this.employeeArray));
    this.onClose();

    this.employeeObj = {
      employeeId: 0,
      fName: '',
      lName: '',
      email: '',
      contact: '',
      salary: '',
    };
  }
  getempDetail() {
    const localData = localStorage.getItem('empdetail');
    if (localData != null) {
      this.employeeArray = JSON.parse(localData);
    }
  }
  onEdit(emp: any) {
    this.employeeObj = emp;
    this.isSidePanel = true;
  }
  onUpdate() {
    const record = this.employeeArray.find(
      (m) => m.employeeId == this.employeeObj.employeeId
    );
    record.fName = this.employeeObj.fName;
    record.lName = this.employeeObj.lName;
    record.email = this.employeeObj.email;
    record.contact = this.employeeObj.contact;
    record.salary = this.employeeObj.salary;
    localStorage.setItem('empdetail', JSON.stringify(this.employeeArray));
    this.onClose();
  }
  onDelete(id: number) {
    for (let i = 0; i < this.employeeArray.length; i++) {
      if (this.employeeArray[i].employeeId == id) {
        this.employeeArray.splice(i, 1);
      }
    }
  }
}
