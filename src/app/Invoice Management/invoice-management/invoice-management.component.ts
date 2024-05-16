import { Component, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExcelService } from 'src/app/excel.service';
import { LocalStorageService } from 'src/app/local-storage.service';

interface UploadedDataItem {
  product_name: string;
  purchase_price: number;
  profit_margin: number;
  selling_price?: number;
  modified_purchase_price?: number;
  modified_selling_price?: number;
  selected?: boolean;
}

interface Invoice {
  invoice_number: number | null;
  invoice_date: Date | null;
  invoice_company: string;
  products: UploadedDataItem[];
}

@Component({
  selector: 'app-invoice-management',
  templateUrl: './invoice-management.component.html',
  styleUrls: ['./invoice-management.component.css'],
})
export class InvoiceManagementComponent implements OnDestroy {
  @ViewChild('addNewProduct') addNewProduct!: ElementRef;

  uploadedData: Invoice[] = [];
  invoice_date: Date | null = null;
  invoice_num: number | null = null;
  invoice_company: string = '';
  invoiceDetails: Invoice[] = [];
  allInvoices: Invoice[] = [];
  emptyRow: UploadedDataItem = {
    product_name: '',
    purchase_price: 0,
    profit_margin: 0,
    selling_price: 0,
    modified_purchase_price: 0,
    modified_selling_price: 0,
    selected: false,
  };

  showEmptyRow: boolean = false;

  excelDataSubscription: Subscription;

  constructor(
    private excelService: ExcelService,
    private localStorageService: LocalStorageService
  ) {
    this.excelDataSubscription = this.excelService.uploadedData$.subscribe(
      (data: Invoice[]) => {
        if (!data || data.length === 0) return;

        this.uploadedData = data
          .filter((invoice) => invoice.invoice_number !== null) // Filter out invoices with null invoice_number
          .map((invoice) => ({
            invoice_number: invoice.invoice_number,
            invoice_date: invoice.invoice_date,
            invoice_company: invoice.invoice_company,
            products: invoice.products.map((item) => ({
              ...item,
              selected: false,
            })),
          }));

        console.log(this.uploadedData);

        if (!this.localStorageService.getData('invoice-data')) {
          this.localStorageService.saveData('invoice-data', this.uploadedData);
          this.showEmptyRow = true;
        } else {
          console.log('Data exists in local storage');
        }
      }
    );
  }

  ngOnInit(): void {
    const savedData = this.localStorageService.getData('invoice-data');
    if (savedData) {
      this.uploadedData = savedData;
      // Remove null values if they exist
      this.uploadedData = this.uploadedData.filter(
        (invoice) => invoice.invoice_number !== null
      );
    } else {
      this.uploadedData = []; // Initialize with an empty array if no data exists
    }
    this.combineInvoiceDetails();
  }

  // Methods for managing selected rows and moving them up/down...
  checkMoveAbility(): boolean {
    if (!this.uploadedData || this.uploadedData.length === 0) return false;
    let selectedCount = 0;
    for (const invoice of this.uploadedData) {
      if (invoice.products) {
        for (const product of invoice.products) {
          if (product.selected) {
            selectedCount++;
            if (selectedCount > 1) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  moveUp() {
    if (this.checkMoveAbility()) {
      for (const invoice of this.uploadedData) {
        const selectedRowIndex = invoice.products.findIndex(
          (row) => row.selected
        );
        if (selectedRowIndex !== -1 && selectedRowIndex > 0) {
          this.moveRowUp(invoice.products, selectedRowIndex);
          break; // Exit loop after the first move
        }
      }
    } else {
      alert('Not allowed to move more than one item');
    }
  }

  moveDown() {
    if (this.checkMoveAbility()) {
      for (const invoice of this.uploadedData) {
        const selectedRowIndex = invoice.products.findIndex(
          (row) => row.selected
        );
        if (
          selectedRowIndex !== -1 &&
          selectedRowIndex < invoice.products.length - 1
        ) {
          this.moveRowDown(invoice.products, selectedRowIndex);
          break; // Exit loop after the first move
        }
      }
    } else {
      alert('Not allowed to move more than one item');
    }
  }

  moveRowUp(products: UploadedDataItem[], index: number): void {
    [products[index - 1], products[index]] = [
      products[index],
      products[index - 1],
    ];
  }

  moveRowDown(products: UploadedDataItem[], index: number): void {
    [products[index], products[index + 1]] = [
      products[index + 1],
      products[index],
    ];
  }

  deleteSelectedRows() {
    if (confirm('Are you sure you want to delete the selected rows?')) {
      for (const invoice of this.uploadedData) {
        invoice.products = invoice.products.filter((row) => !row.selected);
      }
    }
  }
  active_input() {
    if (!this.emptyRow) {
      this.emptyRow = {
        product_name: '',
        purchase_price: 0,
        profit_margin: 0,
        selling_price: 0,
        modified_purchase_price: 0,
        modified_selling_price: 0,
        selected: false,
      };
    }
    this.showEmptyRow = true;
    this.addNewProduct.nativeElement.focus();
  }

  saveNewItem() {
    const newItem: UploadedDataItem = { ...this.emptyRow };
    this.uploadedData[0].products.push(newItem); // Assuming there's only one invoice in uploadedData
    this.localStorageService.saveData('invoice-data', this.uploadedData);
    this.emptyRow.product_name = '';
    this.emptyRow.purchase_price = 0;
    this.emptyRow.profit_margin = 0;
  }

  areAnyRowsSelected(): boolean {
    return this.uploadedData[0].products.some((row) => row.selected); // Assuming there's only one invoice in uploadedData
  }

  saveInvoice() {
    if (!this.invoice_num || !this.invoice_date || !this.invoice_company) {
      alert('Please fill in the mandatory fields before saving.');
      return; // Exit early if mandatory fields are not filled
    }

    this.combineInvoiceDetails(); // Combine invoice details

    if (this.invoiceDetails.length > 0) {
      // Save valid invoice details
      this.allInvoices = this.localStorageService.getData('allInvoices') || [];
      this.allInvoices.push(...this.invoiceDetails);
      this.localStorageService.saveData('allInvoices', this.allInvoices);
      this.invoiceDetails = [];
    } else {
      alert('Please add the invoice data.');
    }
  }

  combineInvoiceDetails() {
    // Check for mandatory fields before creating an invoice
    if (!this.invoice_num || !this.invoice_date || !this.invoice_company) {
      alert('Please fill in the mandatory fields before saving.');
      return; // Exit early if mandatory fields are not filled
    }

    const newInvoice: Invoice = {
      invoice_number: this.invoice_num!,
      invoice_date: this.invoice_date!,
      invoice_company: this.invoice_company,
      products: [...this.uploadedData[0].products.slice()], // Deep copy using slice()
    };
    this.invoiceDetails.push(newInvoice);
  }

  ngOnDestroy(): void {
    this.excelDataSubscription.unsubscribe();
  }
}
