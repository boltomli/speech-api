import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  region: string;
  key: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private storage: Storage, private iab: InAppBrowser) {
    this.storage.get('region').then((val) => {
      this.region = val ? val : 'westus';
    })
    this.storage.get('key').then((val) => {
      this.key = val;
    })
  }

  saveSettings() {
    this.storage.set('key', this.key);
    this.storage.set('region', this.region);

    let toast = this.toastCtrl.create({
      message: 'Settings saved',
      duration: 1000
    });
    toast.present(toast);
  }

  openBrowser(url: string) {
    this.iab.create(url);
  }
}
