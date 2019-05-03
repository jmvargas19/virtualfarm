import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginServicesProvider } from '../../providers/login-services/login-services';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  public userName: string;
  public password: string;
  rootPage:any;
  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public loginService: LoginServicesProvider, 
    public navController: NavController, public storage: Storage, public formBuilder: FormBuilder) {
      this.navCtrl = navCtrl;
 
        this.authForm = formBuilder.group({
            userName: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.storage.set('prueba', 'prueba');
  }

  login() {
    this.storage.remove('token')
    if(this.authForm.valid) {
      let postParams = {
        userName: this.userName,
        password: this.password
      }
      this.loginService.login(postParams).then((user) => {
        let status = JSON.parse(user["status"]);
        let respuesta = JSON.parse(user["_body"]);
        //console.log(user);
        //this.navController.setRoot(HomePage, {userName: this.userName});
        this.storage.set('prueba', 'prueba');
        if (status == 200) {
          /*this.navController.setRoot(HomePage, {
            token: respuesta.token
          });*/
          this.storage.set('token', respuesta.token);
          this.storage.set('userName', respuesta.userName);
          this.navController.setRoot(HomePage, {userName: this.userName});
        }
        else
          alert(respuesta.message);
      })
      .catch((err) => {
        alert("error " + err);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDiload LoginPage');
  }
}
