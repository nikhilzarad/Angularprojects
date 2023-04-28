import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-package-activation',
  templateUrl: './package-activation.component.html',
  styleUrls: ['./package-activation.component.css']
})
export class PackageActivationComponent implements OnInit{
  packageList:any[]=[];
  activeStatus:any;
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.getAllClient();
  }
  getAllClient(){
    this.http.get('http://onlinetestapi.gerasim.in/api/Meeting/GetAllPackages').subscribe((res:any)=>{
      this.packageList=res.data;
    })
  }



}
