import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public sharedData: Observable<any> = this.sharedDataSubject.asObservable();

  setSharedData(data: any): void {
    this.sharedDataSubject.next(data);
  }
}
