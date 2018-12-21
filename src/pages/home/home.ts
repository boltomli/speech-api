import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  gender: string;
  language: string;

  constructor(public navCtrl: NavController) {
    this.gender = 'Female';
    this.language = 'en-US';
  }

}
