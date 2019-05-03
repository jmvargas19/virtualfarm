import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupServicesProvider } from "../../providers/signup-services/signup-services";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  token: string;
  users: any;
  id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public signupServices: SignupServicesProvider, public storage: Storage) {
  }

  getUser() {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.signupServices.getUserById(this.token, this.id).then((usr) => {
        let respuesta = JSON.parse(usr["_body"]);
        this.users = respuesta.users;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
