import { Injectable } from '@angular/core';

declare var Dropbox: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor() { }

  chooseFromDropbox(): Promise<any> {
    return new Promise((resolve, reject) => {
      Dropbox.choose({
        success: resolve,
        cancel: reject,
        linkType: 'direct',
        multiselect: false,
        extensions: ['.xls', '.xlsx'],
      });
    });
  }

  openGooglePicker(): Promise<any> {
    return new Promise((resolve, reject) => {
      const picker = new google.picker.PickerBuilder()
        .addView(new google.picker.DocsView(google.picker.ViewId.SPREADSHEETS))
        .setOAuthToken(/* your OAuth token here */)
        .setCallback((data: { action: any; docs: any[]; }) => {
          if (data.action === google.picker.Action.PICKED) {
            resolve(data.docs[0]);
          } else if (data.action === google.picker.Action.CANCEL) {
            reject('Picker was cancelled');
          }
        })
        .build();

      picker.setVisible(true);
    });
  }
}
