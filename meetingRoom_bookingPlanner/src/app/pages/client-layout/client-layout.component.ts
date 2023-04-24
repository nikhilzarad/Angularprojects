import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent {
  userName: string = '';
  constructor(private router: Router) {
    const name = localStorage.getItem('loginUserName');
    if (name != null) {
      this.userName =JSON.parse(name);
    }
  }
onLogout(){
  this.router.navigateByUrl('');
}
}
