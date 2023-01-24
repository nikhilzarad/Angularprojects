import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  isSidepannel: boolean = false;
  empArray:any[]=[];
  employeeObj: any = {
    empId: 0,
    fName: '',
    lName: '',
    email: '',
    contact: '',
    salary: '',
  };
  constructor() {}

  ngOnInit(): void {
    this.getDetails();
  }

  onAddEmp() {
    this.isSidepannel = true;
  }
  onClose() {
    this.isSidepannel = false;
  }
onSave(){
  this.empArray.push(this.employeeObj);
  this.employeeObj.empId=this.empArray.length+1;
  localStorage.setItem('empdetails',JSON.stringify(this.empArray));
  this.onClose();

  this.employeeObj = {
    empId: 0,
    fName: '',
    lNmae: '',
    email: '',
    contact: '',
    salary: '',
  };
}
getDetails(){
  const localData =localStorage.getItem('empdetails')
  if(localData!=null){
    this.empArray= JSON.parse(localData);

  }


}
onEdit(emp:any){
  this.employeeObj = emp;
  this.isSidepannel = true;
}
onUpdate(){
  const record =this.empArray.find((m)=>m.empId==this.employeeObj.empId);
  record.fName=this.employeeObj.fName;
  record.lName=this.employeeObj.lName;
  record.email=this.employeeObj.email;
  record.contact=this.employeeObj.contact;
  record.salary=this.employeeObj.salary;
  localStorage.setItem('empdetails',JSON.stringify(record))
  this.onClose();

}
onDelete(id:number){
for(let i=0;i< this.empArray.length;i++){
  if(this.empArray[i].empId==id){
    this.empArray.splice(i,1);
  }
}
}
}
