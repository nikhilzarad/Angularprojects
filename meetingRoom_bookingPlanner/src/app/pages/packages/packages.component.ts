import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/core/service/package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit {
  isLoader: boolean = false;
  packagesArray: any[] = [];
  packageObj = {
    packageId: 0,
    packageName: '',
    packageCost: '',
    packageDescription: '',
    isPackageActive: false,
  };

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackage();
  }
  loadPackage() {
    this.isLoader = true;
    setTimeout(() => {
      this.packageService.getAllPackages().subscribe((res: any) => {
        this.isLoader = false;
        this.packagesArray = res.data;
      });
    }, 1000);
  }
  createNewPackage() {
    this.isLoader = true;
    this.packageService.addNewPackage(this.packageObj).subscribe((res: any) => {
      if (res.result) {
        this.isLoader = false;
        this.loadPackage();
        alert('Package added Sucessfully');
      } else {
        alert(res.message);
        this.isLoader = false;
      }
    });
  }
  editRecord(id: number) {
    this.packageService.getPackageById(id).subscribe((res: any) => {
      if (res.result) {
        this.packageObj = res.data;
      } else {
        alert(res.message);
      }
    });
  }
  updatePackage() {
    this.isLoader = true;
    this.packageService
      .updateSelectedPackage(this.packageObj)
      .subscribe((res: any) => {
        if (res.result) {
          this.isLoader = true;
          this.loadPackage();
          alert('Package updated Sucessfully');
        } else {
          alert(res.message);
          this.isLoader = false;
        }
      });
  }
}
