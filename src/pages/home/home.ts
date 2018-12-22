import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

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
  text: string;

  constructor(public navCtrl: NavController, private storage: Storage, private http: Http) {
    this.storage.get('region').then((val) => {
      this.region = val;
    })
    this.storage.get('key').then((val) => {
      this.key = val;
    })
    this.storage.get('language').then((val) => {
      this.language = val ? val : 'en-US';
    })
    this.storage.get('gender').then((val) => {
      this.gender = val ? val : 'Female';
    })
    this.storage.get('voice').then((val) => {
      this.voice = val;
    })
  }

}
