import { Component, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExcelService } from 'src/app/excel.service';
import { LocalStorageService } from 'src/app/local-storage.service';




interface UploadedDataItem {
  product_name: string;
  purchose_price: number;
  profit_margin: number;
  selling_price?: number;
  modefied_purchose_price?: number;
  modefied_selling_price?: number;
  selected?: boolean;
}


@Component({
  selector: 'app-invoice-management',
  templateUrl: './invoice-management.component.html',
  styleUrls: ['./invoice-management.component.css']
})
export class InvoiceManagementComponent implements OnDestroy {
  @ViewChild('addNewProduct') addNewProduct!:ElementRef

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

  showEmptyRow: boolean = false;
  tempArr:object[]=[]
  private excelDataSubscription: Subscription;

  constructor(private excelService: ExcelService, private local_storage:LocalStorageService) {
    this.excelDataSubscription = this.excelService.uploadedData$.subscribe(data => {
      this.uploadedData = data;
      this.uploadedData = data.map(item => ({ ...item, selected: false }));
      console.log(this.uploadedData)
      if(local_storage.getData("invoice-data").length<=0){
        local_storage.saveData("invoice-data",this.uploadedData);
        this.showEmptyRow = true;
      }
      else{console.log("the localhost have data")
    }
    });

  }
  ngOnInit():void{
    const savedData = this.local_storage.getData("invoice-data");
    if (savedData) {
      this.uploadedData = savedData;
    }
  }
  checkMoveAbility():boolean{
    const items=this.uploadedData.filter(e=>{e.selected})
    return items.length <= 1;
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
  active_input(){
    if (!this.emptyRow) {
      this.emptyRow = {
        product_name: '',
        purchose_price: 0,
        profit_margin: 0,
        selling_price: 0,
        modefied_purchose_price: 0,
        modefied_selling_price: 0,
        selected: false
      };
    }
    this.showEmptyRow = true;

    this.addNewProduct.nativeElement.focus();
  }
  save_new_item() {
    // Create a new object with the values from emptyRow
    const newItem: UploadedDataItem = { ...this.emptyRow };

    // Push the new object to uploadedData
    this.uploadedData.push(newItem);
    this.local_storage.saveData("invoice-data",this.uploadedData);


    // Reset the values of emptyRow
    this.emptyRow.product_name = "";
    this.emptyRow.purchose_price = 0;
    this.emptyRow.profit_margin = 0;
  }
  ngOnDestroy(): void {
    this.excelDataSubscription.unsubscribe();
  }
}
