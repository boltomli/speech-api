import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  region: string;
  key: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private storage: Storage) {
    this.storage.get('region').then((val) => {
      this.region = val ? val : 'westus';
    })
    this.storage.get('key').then((val) => {
      this.key = val;
    })
  }

  saveSettings(key: string, region: string) {
    this.storage.set('key', key);
    this.storage.set('region', region);

    let toast = this.toastCtrl.create({
      message: 'Settings saved',
      duration: 1000
    });
    toast.present(toast);
  }
}
