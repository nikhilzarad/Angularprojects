import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  timeArray: any[] = [];
  roomsArray: any[] = [];
  bookingArray: any[] = [];
  userDetails: any;
  bookingData: any;
  bookingObj: any = {
    bookingId: 0,
    roomId: 0,
    userId: 0,
    bookingDate: '2023-04-25T10:08:47.970Z',
    fromTime: '',
    toTime: '',
    createdDate: '2023-04-25T10:08:47.970Z',
    lastUpdated: '2023-04-25T10:08:47.970Z',
  };

  constructor(private http: HttpClient) {
    const loginData = localStorage.getItem('loginInfo');
    if (loginData != null) {
      this.userDetails = JSON.parse(loginData);
      this.getRoomSList();
      this.bookingObj.UserId = this.userDetails.userId;
    }
  }

  ngOnInit(): void {
    this.getTimeList();
    this.getAllBooking();
  }

  createBooking() {
    this.http
      .post(
        'http://onlinetestapi.gerasim.in/api/Meeting/CreateBooking',
        this.bookingObj
      )
      .subscribe((res: any) => {
        if (res.result) {
          this.bookingObj = res.data;
          this.getAllBooking();
          this.btnCloseTrig();
          alert('booking done');
        } else {
          alert(res.message);
        }
      });
  }
  getAllBooking() {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/Meeting/GetAllBookingsByClientId?clientId=' +
          this.userDetails.clientId
      )
      .subscribe((res: any) => {
        this.bookingArray = res.data;
      });
  }

  getRoomSList() {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/Meeting/GetAllRoomsByClientId?id=' +
          this.userDetails.clientId
      )
      .subscribe((res: any) => {
        this.roomsArray = res.data;
      });
  }
  checkBooking(roomid: number, timeid: number) {
    this.bookingData = this.bookingArray.find(
      (m) => m.roomId == roomid && (m.fromTime == timeid || m.toTime == timeid)
    );

    if (this.bookingData) {
      return true;
    } else {
      return false;
    }
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
  // onDelete(Deleteid: number) {
  //   debugger;
  //   const isDelete = confirm('Are you sure want to Delete?');
  //   if (isDelete == true) {
  //     this.http
  //       .post(
  //         'http://onlinetestapi.gerasim.in/api/Meeting/DeleteBookingById?id=' +
  //           Deleteid,
  //         this.bookingObj
  //       )
  //       .subscribe((res: any) => {
  //         if (res.result) {
  //           alert('Booking Deleted Sucessfully');
  //           this.getAllBooking();
  //         } else {
  //           alert(res.message);
  //         }
  //       });
  //   }
  // }
}
