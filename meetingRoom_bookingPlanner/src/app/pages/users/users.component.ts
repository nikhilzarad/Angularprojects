import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
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
      const parseData = JSON.parse(localUserData);
      if (parseData.role == 'Admin') {
        this.getAllUser();
        this.getAllClient();
        this.showClient = true;
      } else {
        this.userObj.clientId = parseData.clientId;
        this.getUserByClientId();
      }
    }
  }

  ngOnInit(): void {}
  getAllClient() {
    this.http
      .get('http://onlinetestapi.gerasim.in/api/Meeting/GetAllClients')
      .subscribe((res: any) => {
        this.clientList = res.data;
      });
  }
  getAllUser() {
    this.http
      .get('http://onlinetestapi.gerasim.in/api/Meeting/GetAllusers')
      .subscribe((res: any) => {
        this.userList = res.data;
      });
  }
  getUserByClientId() {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/Meeting/GetAllUsersByClientId?id=' +
          this.userObj.clientId
      )
      .subscribe((res: any) => {
        this.userList = res.data;
      });
  }
  saveUser() {
    this.http
      .post(
        'http://onlinetestapi.gerasim.in/api/Meeting/AddUsers',
        this.userObj
      )
      .subscribe((res: any) => {
        if (res.result) {
          if (this.parseData.role == 'Admin') {
            this.getAllUser();
            this.getAllClient();
            this.showClient = true;
          } else {
            this.userObj.clientId = this.parseData.clientId;
            this.getUserByClientId();
          }
        } else {
          alert(res.message);
        }
      });
  }
}
