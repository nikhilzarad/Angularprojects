import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
loginObj : any ={
  "userName":'',
  "password" : ''

}
constructor( private http:HttpClient ,private router:Router){

}
ngOnInit(): void {
}
onLogin(){
  this.http.post("https://akbarapi.funplanetresort.in/api/MyRequest/Login",this.loginObj).subscribe((res:any)=>{
    localStorage.setItem("reqObj",JSON.stringify(res));
    if(res.Role =='admin'){
      this.router.navigateByUrl('Employee')
    }else if(res.Role == "Employee"){
      this.router.navigateByUrl('EmpTickets')
    }else if (res.Role =='AdminDepat'){
      this.router.navigateByUrl('DeptTickets')
    }
  })
}
}
