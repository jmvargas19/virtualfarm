import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, Refresher } from 'ionic-angular';
import { TransactionServicesProvider } from "../../providers/transaction-services/transaction-services";
import { TransDescriptionPage } from "../trans-description/trans-description";
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  token: string;
  transactions: any;
  userName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public transactionServices: TransactionServicesProvider, public alerCtrl: AlertController, 
    public storage: Storage) {
      //this.token = navParams.get('token');
      //console.log({token: this.token});
      this.userName= navParams.get('userName');
      this.initializeItems();
  }

  doRefresh(refresher: Refresher){
    console.log("start refresh");
    setTimeout(() => {
      console.log("finish refresh");
      this.getTransactions();
      refresher.complete();
    },1500)
  }

  initializeItems() {
    this.transactions = this.transactions
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.transactions = this.transactions.filter((item) => {
        return (item.productId.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
  ngOnInit() {
    this.getTransactions();
  }

  transDescription(_id) {
    console.log("_id"+JSON.stringify(_id));
    this.navCtrl.push(TransDescriptionPage, {
      id: _id,
      token: this.token
    });
  }

  getTransactions() {
    console.log(this.storage.get('token'))
    this.storage.get('token').then((val) => {
      this.token = val;
      this.transactionServices.getTransaction().then((trns) => {
        let respuesta = JSON.parse(trns["_body"]);
        this.transactions = respuesta.transactions;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  /*deleteProduct(id) {
    this.doConfirm((res) => {
      if (res) {
        this.productServices.deleteProduct(this.token, id).then((pdct) => {
          this.getProducts();
        }).catch((err) => {
          console.log(err);
        })
      }
    });
  }*/

  /*doConfirm(callback: any) {
    let confirm = this.alerCtrl.create({
      title: 'Eliminar Producto',
      message: '¿Deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            return callback(false);
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            return callback(true);
          }
        }
      ]
    });
    confirm.present();
  }*/

}
