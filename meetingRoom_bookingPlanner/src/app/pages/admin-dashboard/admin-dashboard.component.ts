import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

adminDataArray:any[]=[];
constructor(private http:HttpClient){

}

ngOnInit(): void {
  this.getAdminData();
}

getAdminData(){
  this.http.get('http://onlinetestapi.gerasim.in/api/Meeting/getAdminDashboardData').subscribe((res:any)=>{
    this.adminDataArray=res.data;
  })
}
}
