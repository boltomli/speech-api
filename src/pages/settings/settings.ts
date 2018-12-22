import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  region: string;

  constructor(public navCtrl: NavController) {
    this.region = 'westus';
  }

}
