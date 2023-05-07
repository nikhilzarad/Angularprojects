import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  packageForm: boolean = false;
  roomsArray: any[] = [];
  roomObj = {
    roomId: 0,
    roomName: '',
    roomLocation: '',
    roomSeatingCapacity: 0,
    isRoomActive: true,
    clientId: 0,
    CreatedDate: '2023-04-23T05:01:26.691Z',
    LastUpdatetd: '2023-04-23T05:01:26.691Z',
  };

  constructor(private http: HttpClient) {
    const localUser = localStorage.getItem('loginInfo');
    if (localUser != null) {
      const loginParse = JSON.parse(localUser);
      this.roomObj.clientId = loginParse.clientId;

    }
  }
  ngOnInit(): void {
    this.getRoomsByClientId();
  }

  getRoomsByClientId() {
    this.http
      .get(
        'http://onlinetestapi.gerasim.in/api/Meeting/GetAllRoomsByClientId?id=' +
          this.roomObj.clientId
      )
      .subscribe((res: any) => {
        this.roomsArray = res.data;
      });
  }

  createNewRooms() {
    this.http
      .post(
        'http://onlinetestapi.gerasim.in/api/Meeting/CreateRoom',
        this.roomObj
      )
      .subscribe((res: any) => {
        if (res.result) {
          alert('Room added successfully');
          this.getRoomsByClientId();

        } else {
          alert(res.message);
        }
      });
  }

  updateRoom() {

    this.http
      .post(
        'http://onlinetestapi.gerasim.in/api/Meeting/UpdateRoom',
        this.roomObj
      )
      .subscribe((res: any) => {
        if(res.result){
          this.getRoomsByClientId();
          alert('updated successfully')
        }
      });
  }

  editRecord(id: number) {

    this.http
      .get('http://onlinetestapi.gerasim.in/api/Meeting/GetRoomById?id=' + id)
      .subscribe((res: any) => {
        if (res.result) {
          this.roomObj = res.data;
          this.getRoomsByClientId();
        } else {
          alert(res.message);
        }
      });
  }
  onDelete(deleteId: number) {
    const isDelete = confirm('Are You Sure Want to delete Record');
    if (isDelete == true) {
      this.http
        .post(
          'http://onlinetestapi.gerasim.in/api/Meeting/DeleteRoomById?id=' +
            deleteId,
          this.roomObj
        )
        .subscribe((res: any) => {
          if(res.result){
            alert('Record Deleted Successfully');
            this.getRoomsByClientId();
          }else{
            alert(res.message);
          }

        });
    }
  }

  formOpen() {
    this.packageForm = true;
  }
}
