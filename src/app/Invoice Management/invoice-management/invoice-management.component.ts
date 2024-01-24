import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExcelService } from 'src/app/excel.service';



interface UploadedDataItem {
  product_name: string;
  purchose_price: number;
  profit_margin: number;
  selling_price: number;
  modefied_purchose_price: number;
  modefied_selling_price: number;
  selected: boolean;
}


@Component({
  selector: 'app-invoice-management',
  templateUrl: './invoice-management.component.html',
  styleUrls: ['./invoice-management.component.css']
})
export class InvoiceManagementComponent implements OnDestroy {
  uploadedData: UploadedDataItem[] = [];
  emptyRow: UploadedDataItem = {
    product_name: '',
    purchose_price: 0,
    profit_margin: 0,
    selling_price: 0,
    modefied_purchose_price: 0,
    modefied_selling_price: 0,
    selected: false
  };
  private excelDataSubscription: Subscription;

  constructor(private excelService: ExcelService) {
    this.excelDataSubscription = this.excelService.uploadedData$.subscribe(data => {
      this.uploadedData = data;
      this.uploadedData = data.map(item => ({ ...item, selected: false }));
      console.log(this.uploadedData)
    });
  }
  checkMoveAbility():boolean{
    const items=this.uploadedData.filter(e=>{e.selected})
    if(items.length>1){
      return false
    }
    else{
      return true;
    }

  }
  moveUp() {
    console.log(this.checkMoveAbility())
    if (this.checkMoveAbility()){
      let selectedRowIndex = this.uploadedData.findIndex(row => row.selected)
      console.log("selected index val is:" + selectedRowIndex)
      if (selectedRowIndex > 0) {
      this.moveRowUp(selectedRowIndex);
    }
    }
    else{
      alert("Not Allowed to move more than one item")
    }
  }
  moveDown() {
    if (this.checkMoveAbility()){
      let selectedRowIndex = this.uploadedData.findIndex(row => row.selected)
      if (selectedRowIndex < this.uploadedData.length - 1) {
      this.moveRowDown(selectedRowIndex);
      }
    }
    else{
      alert("Not Allowed to move more than one item")
    }
  }

  moveRowUp(index: number): void {
      // Swap the selected row with the row above it
      [this.uploadedData[index - 1], this.uploadedData[index]] = [this.uploadedData[index], this.uploadedData[index - 1]];
  }

  moveRowDown(index: number): void {
      // Swap the selected row with the row below it
      [this.uploadedData[index], this.uploadedData[index + 1]] = [this.uploadedData[index + 1], this.uploadedData[index]];
  }
  ngOnDestroy(): void {
    this.excelDataSubscription.unsubscribe();
  }
}
