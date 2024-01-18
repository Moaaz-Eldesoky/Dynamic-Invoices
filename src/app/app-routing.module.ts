import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { InvoiceManagementComponent } from './Invoice-Upload/invoice-management/invoice-management.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"dashbord",component:DashboardComponent},
  {path:"invoicemgm",component:InvoiceManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
