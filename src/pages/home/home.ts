import { Component } from '@angular/core';
import {NavController, ToastController, AlertController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sortByAlpha: Boolean=false;
  sortText: String="Time";
  tasks: Array<{title: String, date: Date, completed: Boolean}>;
  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public navParams: NavParams) {
    let localTasks = localStorage.getItem("tasks");
    if(localTasks!=null)
      this.tasks=JSON.parse(localTasks);
    else
      this.tasks=[];
  }

  sortAbc()
  {
    this.sortByAlpha=true;
    this.tasks.sort((leftside, rightside): number => {
      if (leftside.title < rightside.title) return -1;
      if (leftside.title > rightside.title) return 1;
      return 0;
    })
    this.sortText="Name";
  }

  sortclicked()
  {
    if(this.sortByAlpha)
      this.sortTime();
    else
      this.sortAbc();
  }

  sortTime()
  {
    this.sortByAlpha=false;
    this.tasks.sort((leftside, rightside): number => {
      if (leftside.date < rightside.date) return -1;
      if (leftside.date > rightside.date) return 1;
      return 0;
    })
    this.sortText="Time";
  }

  addTask(res)
  {
    this.tasks.push({title: res, date: new Date(), completed: false});
    console.log("navparams",this.navParams.get("sortBy"));
    if(this.sortByAlpha) {
      this.tasks.sort((leftside, rightside): number => {
        if (leftside.title < rightside.title) return -1;
        if (leftside.title > rightside.title) return 1;
        return 0;
      })
      console.log("sorted");

    }
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
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
          text: 'Ok',
          handler: data => {
            if(data.name!="") {
              if(data.name.length< 85)
                this.addTask(data.name);
              else
                this.failedAlert("The name must have less than 85 characters");
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
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
          }
        }
      ]
    });
    confirm.present();
  }


}
