import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice-upload',
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.css']
})
export class InvoiceUploadComponent {
  file:any;
  http: any;
  getFile(e:any){
    this.file = e?.target.files[0];
    console.log('file',this.file)
  }
  uploadFile(){
  //   let formData = new FormData();
  //   formData.set('file', this.file);

  //   //call API
  //   this.http.post('......URL.....',formData).subscribe((res)=>{})
  // }
}
}
