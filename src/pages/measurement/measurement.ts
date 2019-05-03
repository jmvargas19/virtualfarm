import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MeasurementServicesProvider } from '../../providers/measurement-services/measurement-services';
import { TransactionPage } from "../transaction/transaction";

@IonicPage()
@Component({
  selector: 'page-measurement',
  templateUrl: 'measurement.html',
})
export class MeasurementPage {
  token: string;
  name: string;
  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public measurementServices: MeasurementServicesProvider, 
    public formBuilder: FormBuilder) {
      this.token = navParams.get('token');
      this.authForm = formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      });
  }

  saveMeasurements() {
    if(this.authForm.valid) {
      let postParams = {
        name : this.name,
      }

      this.measurementServices.NewMeasurement(this.token, postParams).then((pdct) => {
        alert(pdct["statusText"]);
        this.navCtrl.setRoot(TransactionPage, {
          token: this.token
        });
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasurementPage');
  }

}
