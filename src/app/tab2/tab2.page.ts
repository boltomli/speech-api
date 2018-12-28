import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  region: string;
  key: string;
  token: string;
  tokenUrl: string;

  constructor(private platform: Platform,
              private storage: Storage,
              private toastCtrl: ToastController,
              private http: HttpClient) {
    this.platform.ready().then(() => {
      this.storage.get('region').then((region) => {
        this.region = region ? region : 'westus';
        this.tokenUrl = `https://${this.region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
        this.storage.get('key').then((key) => {
          this.key = key;
          if (!key) {
            this.toastCtrl.create({
              message: 'No key present.',
              duration: 1000
            }).then((toast) => {
              toast.present();
            });
        } else {
          this.getToken();
        }
      });
    });
  });
}

getToken() {
  this.http.post(this.tokenUrl, '', {
    headers: {'Ocp-Apim-Subscription-Key': this.key},
    responseType: 'text'
  }).subscribe((token) => {
    this.token = token;
    this.toastCtrl.create({
      message: 'Token set!',
      duration: 1000
    }).then((toast) => {
      toast.present();
    });
  }, (err) => {
    this.toastCtrl.create({
      message: 'Wrong key or region?\n' + err.message,
      duration: 1000
    }).then((toast) => {
      toast.present();
    });
  });
}

saveSettings() {
    this.storage.set('region', this.region).then(() => {
      this.storage.set('key', this.key).then(() => {
        this.getToken();
      });
    });
  }
}
