import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

import { PackageService } from 'src/app/core/service/package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
})
export class PackagesComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;

  packageForm: boolean = false;

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
    this.packageService.getAllPackages().subscribe((res: any) => {
      this.packagesArray = res.data;
    });
  }
  createNewPackage() {
    this.packageForm = false;
    this.packageService.addNewPackage(this.packageObj).subscribe((res: any) => {
      if (res.result) {
        this.loadPackage();
        alert('Package added Sucessfully');
        this.clearForm();
      } else {
        alert(res.message);
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
    this.packageForm = false;
    this.packageService
      .updateSelectedPackage(this.packageObj)
      .subscribe((res: any) => {
        if (res.result) {
          this.loadPackage();
          alert('Package updated Sucessfully');
          this.clearForm();
        } else {
          alert(res.message);
        }
      });
  }
  onDelete(pkgId: number) {
    const isDelete = confirm('Are you sure want to Delete?');
    if (isDelete == true) {
      this.packageService.deletePackage(pkgId).subscribe((res: any) => {
        if (res.result) {
          this.loadPackage();
          alert('Package Deleted Sucessfully');
        } else {
          alert(res.message);
        }
      });
    }
  }
  formOpen() {
    this.packageForm = true;
  }
  clearForm() {
    this.myForm.resetForm();
  }
}
