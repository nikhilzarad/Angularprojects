import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { ClientComponent } from './pages/client/client.component';
import { UsersComponent } from './pages/users/users.component';
import { PackageActivationComponent } from './pages/package-activation/package-activation.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    PackagesComponent,
    ClientComponent,
    UsersComponent,
    PackageActivationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
