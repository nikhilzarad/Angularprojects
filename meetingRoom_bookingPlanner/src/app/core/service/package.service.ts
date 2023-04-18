import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private http: HttpClient) {}

  getAllPackages() {
    return this.http.get(
      'http://onlinetestapi.gerasim.in/api/Meeting/GetAllPackages'
    );
  }
  addNewPackage(obj: any) {
    return this.http.post(
      'http://onlinetestapi.gerasim.in/api/Meeting/CreatePackage',
      obj
    );
  }
  getPackageById(pkgId: number) {
    return this.http.get(
      'http://onlinetestapi.gerasim.in/api/Meeting/GetPackgeById?id=' + pkgId
    );
  }
  updateSelectedPackage(obj: any) {
    return this.http.post(
      'http://onlinetestapi.gerasim.in/api/Meeting/UpdatePackge',
      obj
    );
  }
}
