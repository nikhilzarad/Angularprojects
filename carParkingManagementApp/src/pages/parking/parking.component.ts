import { Component, OnInit, inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css',
})
export class ParkingComponent implements OnInit {
  parkingLotList: any[] = [];
  selectedParkingLot: any = {};
  parkingSpot: number[] = [];
  selectedparkingSpotNo: number = 0;
  bookingSpotobj: any = {
    parkingId: 0,
    parkingLotId: 0,
    vehicleNo: '',
    mobileNo: '',
    inTime: '',
    outTime: 0,
    parkingDate: new Date(),
    spotNo: 0,
  };
  releaseObj: any = {
    parkingId: 0,
    parkingLotId: 0,
    vehicleNo: '',
    mobileNo: '',
    inTime: '',
    outTime: '',
    parkingDate: new Date(),
    spotNo: 0,
  };

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.getParkingLots();
  }

  getParkingLots() {
    this.masterService.getAllParkingLots().subscribe((res: any) => {
      this.parkingLotList = res.data;
      this.selectedParkingLot = this.parkingLotList[0];
      this.createSpotList(this.selectedParkingLot.totalParkingSpot);
    });
  }
  createSpotList(totalSpot: number) {
    this.parkingSpot = [];
    for (let i = 1; i < totalSpot; i++) {
      this.parkingSpot.push(i);
    }
  }
  onbookspot() {
    this.bookingSpotobj.parkingLotId = this.selectedParkingLot.parkingLotId;
    this.bookingSpotobj.spotNo = this.selectedparkingSpotNo;
    this.masterService
      .bookingspots(this.bookingSpotobj)
      .subscribe((res: any) => {
        if (res.result) {
          alert('Booking Done');
        } else {
          alert(res.message);
        }
      });
  }
  setSelectParkigLot(data: any) {
    this.selectedParkingLot = data;
    this.createSpotList(this.selectedParkingLot.totalParkingSpot);
  }
  openModel(SpotNo: number) {
    this.selectedparkingSpotNo = SpotNo;
    const model = document.getElementById('bookModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }
  closeModel() {
    const model = document.getElementById('bookModal');
    if (model != null) {
      model.style.display = 'none';
    }
  }
}
