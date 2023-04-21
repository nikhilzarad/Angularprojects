import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from './pages/packages/packages.component';
import { ClientComponent } from './pages/client/client.component';
import { PackageActivationComponent } from './pages/package-activation/package-activation.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientAdminDashboardComponent } from './pages/client-admin-dashboard/client-admin-dashboard.component';
import { ClientUserDashboardComponent } from './pages/client-user-dashboard/client-user-dashboard.component';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';
import { ClientLayoutComponent } from './pages/client-layout/client-layout.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'admin-Dashboard', component: AdminDashboardComponent },
      { path: 'packages', component: PackagesComponent },
      { path: 'client', component: ClientComponent },
      { path: 'package-Activation', component: PackageActivationComponent },
      { path: 'users', component: UsersComponent },
    ],
  }, //for the superadmin Acess
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'client-Dashboard', component: ClientAdminDashboardComponent },
    ],
  }, //for the clientAdmin Acess
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'user-Dashboard', component: ClientUserDashboardComponent },
    ],
  }, //for the clientUser Acess
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
