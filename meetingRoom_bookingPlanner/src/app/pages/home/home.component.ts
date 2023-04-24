import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
