import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  savedInvoices: any[] = [];
  selectedInvoice: any;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveInvoicesData();
  }

  retrieveInvoicesData() {
    this.savedInvoices = this.localStorage.getData('allInvoices') || [];
    console.log('savedInvoices:' + JSON.stringify(this.savedInvoices));
  }

  changeLocalhostData(inv_num: any) {
    console.log('selected number' + inv_num);
    this.selectedInvoice = this.savedInvoices.find(
      (invoice) => invoice.invoice_number === inv_num
    );
    console.log('selectedInvoice is :' + JSON.stringify(this.selectedInvoice));
    if (this.selectedInvoice) {
      this.localStorage.saveData('invoice-data', this.selectedInvoice);
      this.router.navigate(['/invoicemgm']);
    } else {
      // Handle case when invoice is not found
      alert('This invoice data does not exist');
    }
  }
}
