import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private http: HttpClient) {}

  getAllPackages() {
    return this.http.get(
      '/api/Meeting/GetAllPackages'
    );
  }
  addNewPackage(obj: any) {
    return this.http.post(
      '/api/Meeting/CreatePackage',
      obj
    );
  }
  getPackageById(pkgId: number) {
    return this.http.get(
      '/api/Meeting/GetPackgeById?id=' + pkgId
    );
  }
  updateSelectedPackage(obj: any) {
    return this.http.post(
      '/api/Meeting/UpdatePackge',
      obj
    );
  }
  deletePackage(id: any) {
    return this.http.post(
      '/api/Meeting/DeletePackgeById?id=' + id,
      {}
    );
  }
}
