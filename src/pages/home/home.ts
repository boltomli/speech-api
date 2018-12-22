import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  region: string
  key: string;
  language: string;
  gender: string;
  voice: string;

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.storage.get('region').then((val) => {
      this.region = val;
    })
    this.storage.get('key').then((val) => {
      this.key = val;
    })
    this.storage.get('language').then((val) => {
      this.language = val;
    })
    this.storage.get('gender').then((val) => {
      this.gender = val;
    })
    this.storage.get('voice').then((val) => {
      this.voice = val;
    })
  }

}
