import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-client-user-dashboard',
  templateUrl: './client-user-dashboard.component.html',
  styleUrls: ['./client-user-dashboard.component.css'],
})
export class ClientUserDashboardComponent {
  ClientUserBookingArray: any[] = [];
  loginClientUser: any;
  constructor(private http: HttpClient) {
    const localUser = localStorage.getItem('loginInfo');
    if (localUser != null) {
      const loginParse = JSON.parse(localUser);
      this.loginClientUser = loginParse.clientId;
    }
  }
  ngOnInit(): void {
    this.getClientAdminData();
  }
  getClientAdminData() {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/Meeting/GetClientUserDashboard?id=' +
          this.loginClientUser
      )
      .subscribe((res: any) => {
        this.ClientUserBookingArray = res.data;
      });
  }
}
