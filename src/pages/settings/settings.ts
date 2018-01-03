import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  checkup: String;
  constructor(public navCtrl: NavController) {

    }
  onChange(CValue) {
    console.log(CValue);
    this.checkup=CValue;
    this.navCtrl.push(HomePage, {
      sortBy: this.checkup
    });
  }
    Checkup(){
    return this.checkup;
    }
  }


