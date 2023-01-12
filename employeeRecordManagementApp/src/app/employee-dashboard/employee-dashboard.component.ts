import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit{
  isSidePanel:boolean =false;
  employeeValue: FormGroup;

constructor(){
  this.employeeValue = new FormGroup({
    firstName : new FormControl(),
    lastName : new FormControl(),
    contact : new FormControl(),
    email : new FormControl(),
    salary : new FormControl(),
  })

}
  ngOnInit(): void {

}

onAdd(){
  this.isSidePanel=false;
}
onClose(){
  this.isSidePanel=true;
}
onsave(){
  const formValue = this.employeeValue.value;
}












}
