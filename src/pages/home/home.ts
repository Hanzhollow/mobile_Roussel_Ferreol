import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  AddPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'New task',
      message: "Enter a name for this new task",
      inputs: [
        {
          name: 'name',
          placeholder: 'New task name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Next',
          handler: data => {
            console.log('Next clicked');
          }
        }
      ]
    });
    prompt.present();
  
  }
  ClosePrompt() {
    let toast = this.toastCtrl.create({
      message: 'Please select tasks to close',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}