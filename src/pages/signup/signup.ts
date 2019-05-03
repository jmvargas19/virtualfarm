import { Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SignupServicesProvider } from '../../providers/signup-services/signup-services';
import { DepartmentServicesProvider } from '../../providers/department-services/department-services';
import { TownServicesProvider } from '../../providers/town-services/town-services';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit {
  public userName: string;
  public name1: string;
  public name2: string;
  public surname1: string;
  public surname2: string;
  public cellphone: string;
  public address: string;
  public departmentId: string;
  public departments: string[];
  public townId: string;
  public towns: string[];
  public email: string;
  public password: string;
  rootPage:any;
  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http, public signupServices: SignupServicesProvider, public formBuilder: FormBuilder,
    public navController: NavController, public departmentServices: DepartmentServicesProvider,
    public townServices: TownServicesProvider,
    public storage: Storage) {
      this.authForm = formBuilder.group({
        userName: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
        name1: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
        name2: ['', Validators.compose([Validators.pattern('[a-zA-Z]*')])],
        surname1: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
        surname2: ['', Validators.compose([Validators.pattern('[a-zA-Z]*')])],
        email: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        cellphone: ['', Validators.compose([Validators.required])],
        address: ['', Validators.compose([Validators.required])],
        townId: ['', Validators.compose([Validators.required,])],
        departmentId: ['', Validators.compose([Validators.required,])],
    });
  }

  ngOnInit(){
    this.getDepartments();
    this.getTowns();
   }

   getDepartments() {
    this.departmentServices.getDepartment().then((dprt) => {
      let respuesta = JSON.parse(dprt["_body"]);
      this.departments = respuesta.departments;
    }).catch((err) => {
      console.log(err);
    })
  }

  getTowns() {
    this.townServices.getTown().then((twn) => {
      let respuesta = JSON.parse(twn["_body"]);
      this.towns = respuesta.towns;
    }).catch((err) => {
      console.log(err);
    })
  }
  signup() {
    if(this.authForm.valid) {
      this.storage.remove('token')
      let postParams = {
        userName: this.userName,
        name1: this.name1,
        name2: this.name2,
        surname1: this.surname1,
        surname2: this.surname2,
        cellphone: this.cellphone,
        address: this.address,
        townId: this.townId,
        email: this.email,
        password: this.password
      }
      this.signupServices.signup(postParams).then((user) => {
        let status = JSON.parse(user["status"]);
        let respuesta = JSON.parse(user["_body"]);
        console.log(user);
        if (status == 200) {
          /*this.navController.setRoot(HomePage, {
            token: respuesta.token
          });*/
          //this.storage.set('token', respuesta.token);
        this.navController.setRoot(HomePage);
        }
        else {
          alert(respuesta.message);
        }
      }).catch((err) => {
        alert("error " + err);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
