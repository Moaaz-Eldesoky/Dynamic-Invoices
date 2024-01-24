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
  // file:any = {name:"test file",size:"30M"};
  file:any ;
  // file:any = {name:"test file",size:"30M"};
  http: any;
  constructor(private router:Router, private excel:ExcelService){}
  getFile(e:any){
    this.file = e?.target.files[0];
    console.log('file',this.file)
  }
  uploadFile(){
  this.excel.excelToJson(this.file)
  this.router.navigate(['/invoicemgm'])
  }
}
