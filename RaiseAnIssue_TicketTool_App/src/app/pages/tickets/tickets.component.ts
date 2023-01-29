import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  ticketObj = {
    RequestId: 0,
    RequestNo: '',
    EmployeeId: 0,
    CreatedDate: '',
    ExpectedEndDate: '',
    Severity: '',
    DeptId: 0,
    CompletedDate: '',
    AssignedTo: 0,
    State: '',
    RequestDetails: '',
  };
  loggedUserData: any;
  departmentList:any[] = [];
  gridList:any[] = [];

  constructor(private http: HttpClient) {
    const localData = localStorage.getItem('reqObj');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.ticketObj.EmployeeId = this.loggedUserData.EmployeeId;
    }
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getEmployeeByLoggedEmployee();
  }
  getEmployeeByLoggedEmployee() {
    this.http.get("https://akbarapi.funplanetresort.in/api/MyRequest/GetAllRequestByEmployee?id="+ this.loggedUserData.EmployeeId).subscribe((res:any)=>{
      this.gridList = res;
      });
  }
  getDepartments() {
    this.http
      .get('https://akbarapi.funplanetresort.in/api/MyRequest/GetDepartments')
      .subscribe((res: any) => {
        this.departmentList = res;
      });
  }
  onCreateTicket() {
    this.http
      .post(
        'https://akbarapi.funplanetresort.in/api/MyRequest/CreateRequestMaster',
        this.ticketObj
      )
      .subscribe((res: any) => {});
  }
}
