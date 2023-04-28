import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  packageForm:boolean=false;
  clientArray:any[]=[];
  clientObj:any={
    "clientId": 0,
    "clientName": "",
    "companyName": "",
    "address": "",
    "city": "",
    "pinCode": "",
    "state": "",
    "EmployeeStrength": 0,
    "gstNo": "",
    "contactNo": ""
  }
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.getAllClient();
  }

 getAllClient(){
  this.http.get('http://onlinetestapi.gerasim.in/api/Meeting/GetAllClients').subscribe((res:any)=>{
    this.clientArray=res.data;
  })
 }
 addNewClient(){
  this.http.post('http://onlinetestapi.gerasim.in/api/Meeting/AddClients',this.clientObj).subscribe((res:any)=>{
    this.clientObj=res.data;
    this.getAllClient();
  })
 }


 editRecord(id:number){
  this.http.get('http://onlinetestapi.gerasim.in/api/Meeting/GetClientsById?id='+id).subscribe((res:any)=>{
    if (res.result) {
      this.clientObj = res.data;
    } else {
      alert(res.message);
    }
 })
}

 onDelete(Deleteid:number){
  const isDelete = confirm('Are you sure want to Delete?');
    if (isDelete == true) {
  this.http.post('http://onlinetestapi.gerasim.in/api/Meeting/DeleteClients?id='+Deleteid,this.clientObj).subscribe((res:any)=>{
    if (res.result) {
      this.getAllClient();
      alert('Client Deleted Sucessfully');
    } else {
      alert(res.message);
    }
 })
 }}
 updateClient() {
  this.http.post('http://onlinetestapi.gerasim.in/api/Meeting/UpdateClients',this.clientObj).subscribe((res:any)=>{
      if (res.result) {
        alert('client updated Successfully');
        this.getAllClient()
      } else {
        alert(res.message);
      }
    });
}



 formOpen(){
  this.packageForm=true;
 }

}
