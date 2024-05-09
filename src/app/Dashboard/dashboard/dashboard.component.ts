import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private localStorage: LocalStorageService) {}
  savedInvoices: [] = [];
  ngOnInit(): void {
    this.retriveInvocesData();
  }
  retriveInvocesData() {
    this.savedInvoices = this.localStorage.getData('invoice-details');
    console.log(this.savedInvoices);
  }
}
