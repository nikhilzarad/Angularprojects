import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;
  userForm:boolean=false;
  parseData: any;
  showClient: boolean = false;
  clientList: any[] = [];
  userList: any[] = [];
  userObj: any = {
    userId: 0,
    clientId: 0,
    userName: '',
    userPassword: '',
    createdDate: '2023-03-10T07:55:17.157',
    lastUpdated: '2023-03-10T07:55:17.157',
    isActive: false,
    role: '',
  };
  constructor(private http: HttpClient) {
    const localUserData = localStorage.getItem('loginInfo');
    if (localUserData != null) {
      this.parseData = JSON.parse(localUserData);
      if (this.parseData.role == 'Admin') {
        this.getAllUser();
        this.getAllClient();
        this.showClient = true;
      } else {
        this.userObj.clientId = this.parseData.clientId;
        this.getUserByClientId();
      }
    }
  }

  ngOnInit(): void {}
  getAllClient() {
    this.http
      .get('/api/Meeting/GetAllClients')
      .subscribe((res: any) => {
        this.clientList = res.data;
      });
  }
  getAllUser() {
    this.http
      .get('/api/Meeting/GetAllusers')
      .subscribe((res: any) => {
        this.userList = res.data;
      });
  }
  getUserByClientId() {
    this.http
      .get(
        '/api/Meeting/GetAllUsersByClientId?id=' +
          this.userObj.clientId
      )
      .subscribe((res: any) => {
        this.userList = res.data;
      });
  }

  saveUser() {
    this.http
      .post(
        '/api/Meeting/AddUsers',
        this.userObj
      )
      .subscribe((res: any) => {
        if (res.result) {
          if (this.parseData.role == 'Admin') {
            this.getAllUser();
            this.getAllClient();
            this.showClient = true;
            alert('User Added Successfully');
            this.clearForm();
          } else {
            this.userObj.clientId = this.parseData.clientId;
            this.getUserByClientId();
          }
        } else  {
          alert(res.message);
        }
      });
  }
  onDelete(Deleteid:number){
    const isDelete = confirm('Are you sure want to Delete?');
      if (isDelete == true) {
    this.http.post('/api/Meeting/DeleteUsersById?id='+Deleteid,this.userObj).subscribe((res:any)=>{
      if (res.result) {
        this.getAllUser();
        alert('User Deleted Sucessfully');
      } else {
        alert(res.message);
      }
   })
   }}
   updateUser() {
    this.http.post('/api/Meeting/UpdateUser',this.userObj).subscribe((res:any)=>{
        if (res.result) {
          alert('User updated Successfully');
          this.getAllUser();
        } else {
          alert(res.message);
        }
      });}
      editRecord(id:number){
        this.http.get('/api/Meeting/GetUsersById?id='+id).subscribe((res:any)=>{
          if (res.result) {
            this.userObj = res.data;
          } else {
            alert(res.message);
          }
       })
      }

  formOpen(){
    this.userForm=true;
  }
  clearForm() {
    this.myForm.resetForm();
  }
}
