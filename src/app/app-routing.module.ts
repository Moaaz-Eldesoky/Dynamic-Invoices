import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { InvoiceManagementComponent } from './Invoice Management/invoice-management/invoice-management.component';
import { InvoiceUploadComponent } from './Invoice-Upload/invoice-upload/invoice-upload.component';

const routes: Routes = [
  {path:"",component:InvoiceUploadComponent},
  {path:"invoiceupl",component:InvoiceUploadComponent},
  {path:"invoicemgm",component:InvoiceManagementComponent},
  {path:"login", component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"dashbord",component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
