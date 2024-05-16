import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}
  savedInvoices: any[] = [];
  selectedInvoice: any;
  ngOnInit(): void {
    this.retriveInvocesData();
  }
  retriveInvocesData() {
    this.savedInvoices = this.localStorage.getData('allInvoices');
    console.log('savedInvoices:' + JSON.stringify(this.savedInvoices));
  }
  changeLocalhostData(inv_num: any) {
    this.selectedInvoice = this.savedInvoices.find(
      (invoice) => invoice[0].invoice_number === inv_num
    );
    if (this.selectedInvoice) {
      this.localStorage.saveData('invoice-data', this.selectedInvoice);
      this.router.navigate(['/invoicemgm']);
    } else {
      // Handle case when invoice is not found
      alert('this invoice data does not Exist');
    }
  }
}
