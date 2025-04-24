import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  @ViewChild('myForm') myForm!: NgForm;
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
  this.http.get('/api/Meeting/GetAllClients').subscribe((res:any)=>{
    this.clientArray=res.data;
  })
 }
 addNewClient(){
  this.http.post('/api/Meeting/AddClients',this.clientObj).subscribe((res:any)=>{
    if(res.result){

      this.clientObj=res.data;
        this.getAllClient();
        alert('Client Added Succefully')
        this.clearForm();
    }else{alert(res.message);}
  })
 }


 editRecord(id:number){
  this.http.get('/api/Meeting/GetClientsById?id='+id).subscribe((res:any)=>{
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
  this.http.post('/api/Meeting/DeleteClients?id='+Deleteid,this.clientObj).subscribe((res:any)=>{
    if (res.result) {
      this.getAllClient();
      alert('Client Deleted Sucessfully');
    } else {
      alert(res.message);
    }
 })
 }}
 updateClient() {
  this.http.post('/api/Meeting/UpdateClients',this.clientObj).subscribe((res:any)=>{
      if (res.result) {
        alert('client updated Successfully');
        this.getAllClient()
      } else {
        alert(res.message);
      }
    });
}
clearForm() {
  this.myForm.resetForm();
}
 formOpen(){
  this.packageForm=true;
 }

}
