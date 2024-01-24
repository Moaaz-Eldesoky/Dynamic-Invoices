import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/excel.service';
@Component({
  selector: 'app-invoice-upload',
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.css']
})
export class InvoiceUploadComponent {
  file:any ;
  local_file: any = [{
    modefied_purchose_price: "20", modefied_selling_price: "28", product_name: "rice", profit_margin: "10", purchose_price: "15", selected: true, selling_price: "16.5"
  }, {
    modefied_purchose_price: "20", modefied_selling_price: "28", product_name: "oil", profit_margin: "10", purchose_price: "15", selected: true, selling_price: "16.5"
  },{
    modefied_purchose_price: "20", modefied_selling_price: "28", product_name: "cheese", profit_margin: "10", purchose_price: "15", selected: true, selling_price: "16.5"
  }]
  constructor(private router: Router, private excel: ExcelService) { }
  getFile(e: any) {
    this.file = e?.target.files[0];

  }
  uploadFile() {
    this.excel.excelToJson(this.file)
    this.router.navigate(['/invoicemgm'])
    console.log("local file:"+ this.local_file)
    console.log('file', this.file)
  }
}
