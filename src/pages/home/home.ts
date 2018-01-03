import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: Array<{title: String, completed: Boolean}>;
  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.tasks=[];
  }

  addTask(res)
  {
    this.tasks.push({title: res, completed: false});
    this.tasks.sort((leftside, rightside): number => {
      if(leftside.title < rightside.title)return -1;
      if(leftside.title > rightside.title)return 1;
      return 0;
    })
    console.log("sorted");
  }

  failedAlert(text) {
    let alert = this.alertCtrl.create({
      title: 'Failed',
      subTitle: text,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.AddPrompt();
        }
      }]

    });
    alert.present();
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
            if(data.name!="") {
              console.log('Next clicked');
              console.log(this.tasks);
              this.addTask(data.name);
            }
            else
            {
              this.failedAlert("A name is required");
            }
            }
        }
      ]
    });
    prompt.present();

  }

  ClosePrompt() {
    let confirm = this.alertCtrl.create({
      title: 'Delete the completed tasks ?',
      message: 'Are you sure you want to delete the tasks marked as completed ?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            for(let i=0;i<this.tasks.length;i++)
            {
              if(this.tasks[i].completed)
              {
                this.tasks.splice(i, 1);
                i--;
              }
            }
          }
        }
      ]
    });
    confirm.present();
  }


}
