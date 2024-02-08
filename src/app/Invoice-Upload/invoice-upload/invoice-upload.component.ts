import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CloudService } from 'src/app/cloud.service';
import { ExcelService } from 'src/app/excel.service';
CloudService
@Component({
  selector: 'app-invoice-upload',
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.css']
})
export class InvoiceUploadComponent {
  file:any ;
  constructor(private router: Router, private excel: ExcelService, private cloudService:CloudService) { }
  getFile(e: any) {
    this.file = e?.target.files[0];
  }
  uploadFile() {
    this.excel.excelToJson(this.file)
    this.router.navigate(['/invoicemgm'])
    console.log('file', this.file)
  }
  async chooseFromDropbox() {
    try {
      const file = await this.cloudService.chooseFromDropbox();
      this.handleFileSelection(file);
    } catch (error) {
      console.error('Dropbox Chooser Error:', error);
    }
  }

  async openGooglePicker() {
    try {
      const file = await this.cloudService.openGooglePicker();
      this.handleFileSelection(file);
    } catch (error) {
      console.error('Google Picker Error:', error);
    }
  }

  handleFileSelection(file: any) {
    // Handle the selected file (e.g., display file details, upload, etc.)
    console.log('Selected File:', file);
  }
}
















// local_file: any = [{
//   modefied_purchose_price: "20", modefied_selling_price: "28", product_name: "rice", profit_margin: "10", purchose_price: "15", selected: true, selling_price: "16.5"
// }, {
//   modefied_purchose_price: "20", modefied_selling_price: "28", product_name: "oil", profit_margin: "10", purchose_price: "15", selected: true, selling_price: "16.5"
// },{
//   modefied_purchose_price: "20", modefied_selling_price: "28", product_name: "cheese", profit_margin: "10", purchose_price: "15", selected: true, selling_price: "16.5"
// }]
