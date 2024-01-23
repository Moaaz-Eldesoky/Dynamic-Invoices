// excel.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private uploadedDataSubject = new BehaviorSubject<any[]>([]);
  uploadedData$ = this.uploadedDataSubject.asObservable();

  constructor() {}

  excelToJson(file: File): void {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: Uint8Array = new Uint8Array(e.target.result);
      const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      this.uploadedDataSubject.next(jsonData);
    };

    reader.readAsArrayBuffer(file);
  }
}
