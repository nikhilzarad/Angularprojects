import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  
 
  apiUrl : string = 'https://freeapi.gerasim.in/api/ParkingSpotBooking/'

  constructor(private http:HttpClient ) {}

  getAllParkingLots(){
    return this.http.get(`${this.apiUrl}GetAllParkingLots`);
  }
  bookingspots(obj:any){
    return this.http.post(`${this.apiUrl}BookSpot`,obj)
  }
  releseSpots(obj:any){
    return this.http.put(`${this.apiUrl}ReleaseSpot`,obj)
  }
}
