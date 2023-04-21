import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent {
constructor(private router:Router){}

onLogout(){
  this.router.navigateByUrl('');
}
}
