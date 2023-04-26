import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  timeArray: any[] = [];
  bookingArray: any[] = [];
  userDetails: any;
  bookingObj: any = {
    BookingId: 0,
    RoomId: 0,
    UserId: 0,
    BookingDate: '2023-04-25T10:08:47.970Z',
    FromTime: 0,
    ToTime: 0,
    CreatedDate: '2023-04-25T10:08:47.970Z',
    LastUpdated: '2023-04-25T10:08:47.970Z',
  };

  constructor(private http: HttpClient) {
    const loginData = localStorage.getItem('loginInfo');
    if (loginData != null) {
      const parseData = JSON.parse(loginData);
      this.userDetails = parseData.clientId;
      this.getAllBooking();
      this.getTimeList();
    }
  }

  ngOnInit(): void {
    this.getAllBooking();
  }
  getAllBooking() {
    this.http
      .get('http://onlinetestapi.gerasim.in/api/Meeting/GetAllBookings')
      .subscribe((res: any) => {
        this.bookingArray = res.data;
      });
  }

  createBooking() {
    this.http
      .post(
        'http://onlinetestapi.gerasim.in/api/Meeting/CreateBooking',
        this.bookingObj
      )
      .subscribe((res: any) => {
        this.bookingObj = res.data;
      });
  }

  getBookingByClientId() {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/Meeting/GetAllBookingsByClientId?clientId=' +
          this.userDetails.clientId
      )
      .subscribe((res: any) => {
        this.userDetails = res.data;
      });
  }
  getBookingByUserId() {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/Meeting/GetAllBookingsByUserId?userId=' +
          this.bookingObj.UserId
      )
      .subscribe((res: any) => {
        this.bookingObj = res.data;
      });
  }
  getTimeList() {
    this.http
      .get('http://onlinetestapi.gerasim.in/api/Meeting/GetTimeList')
      .subscribe((res: any) => {
        this.timeArray = res.data;
      });
  }

  btnOpenTrig() {
    var modal = document.getElementById('mybtn');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }
  btnCloseTrig() {
    var modal = document.getElementById('mybtn');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }
}
