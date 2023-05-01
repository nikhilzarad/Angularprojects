import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-admin-dashboard',
  templateUrl: './client-admin-dashboard.component.html',
  styleUrls: ['./client-admin-dashboard.component.css'],
})
export class ClientAdminDashboardComponent implements OnInit {
  ClientBookingArray: any[] = [];
  loginClient: any;
  constructor(private http: HttpClient) {
    const localUser = localStorage.getItem('loginInfo');
    if (localUser != null) {
      const loginParse = JSON.parse(localUser);
      this.loginClient = loginParse.clientId;
    }
  }
  ngOnInit(): void {
    this.getClientAdminData();
  }
  getClientAdminData() {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/Meeting/GetClientAdminDashboard?id=' +
          this.loginClient
      )
      .subscribe((res: any) => {
        this.ClientBookingArray = res.data;
      });
  }
}
