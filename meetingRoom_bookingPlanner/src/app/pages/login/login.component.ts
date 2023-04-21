import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginObj: any = {
    userName: '',
    userPassword: '',
  };
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}
  onLogin() {
    this.http
      .post('http://onlinetestapi.gerasim.in/api/Meeting/login', this.loginObj)
      .subscribe((res: any) => {
        if (res.result) {
          if (res.data.role == 'SuperAdmin') {
            this.router.navigateByUrl('admin-Dashboard');
          } else if (res.data.role == 'ClientAdmin') {
            this.router.navigateByUrl('client-Dashboard');
          } else if (res.data.role == 'ClientUser') {
            this.router.navigateByUrl('user-Dashboard');
          }
        } else {
          alert(res.message);
        }
      });
  }
}
