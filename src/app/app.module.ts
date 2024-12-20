import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { InvoiceUploadComponent } from './Invoice-Upload/invoice-upload/invoice-upload.component';
import { InvoiceManagementComponent } from './Invoice Management/invoice-management/invoice-management.component';
import { CurrencyExchangeComponent } from './Currency-Exchange-Rate/currency-exchange/currency-exchange.component';
import { PriceAdjustmentComponent } from './Product-Price-Adjustment/price-adjustment/price-adjustment.component';
import { NotificationComponentComponent } from './Notification-Component/notification-component/notification-component.component';
import { UserSettingsComponent } from './User-Settings/user-settings/user-settings.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ExcelService } from './excel.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InvoiceUploadComponent,
    InvoiceManagementComponent,
    CurrencyExchangeComponent,
    PriceAdjustmentComponent,
    NotificationComponentComponent,
    UserSettingsComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
  ],
  providers: [ExcelService, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
