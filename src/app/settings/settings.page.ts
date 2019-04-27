import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, ToastController } from '@ionic/angular';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  region: string;
  key: string;
  token: string;
  tokenUrl: string;
  regions: any[] = [
    {
      id: 'westus',
      name: 'West US',
    },
    {
      id: 'westus2',
      name: 'West US2',
    },
    {
      id: 'southeastasia',
      name: 'South East Asia',
    }
  ];

  constructor(
    private platform: Platform,
    private storage: StorageService,
    private toastCtrl: ToastController,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.storage.get('region').then((region) => {
        this.region = region ? region : this.regions[0].id;
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
            this.storage.get('token').then((token) => {
              if (!token) {
                this.getToken();
              } else {
                this.token = token;
              }
            });
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
      this.storage.set('token', token).then(() => {
        this.token = token;
        this.toastCtrl.create({
          message: 'Token set!',
          duration: 1000
        }).then((toast) => {
          toast.present();
        });
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
