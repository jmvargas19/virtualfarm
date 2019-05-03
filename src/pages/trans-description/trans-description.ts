import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ProductServicesProvider } from '../../providers/product-services/product-services';
//import { CategoryServicesProvider } from '../../providers/category-services/category-services';
import { TransactionServicesProvider } from '../../providers/transaction-services/transaction-services';

@IonicPage()
@Component({
  selector: 'page-trans-description',
  templateUrl: 'trans-description.html',
})
export class TransDescriptionPage implements OnInit {
  token: string;
  id: any;
  typeTransactionId: string;
  userId: string;
  userIda: string;
  userIdb: string;
  userIdc: string;
  categoryId: string;
  productId: string;
  typeProductId: string;
  measurementId: string;
  stateId: string;
  publicationDate: string;
  expirationDate: string;
  description: string;
  price: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public transactionServices: TransactionServicesProvider) {
      this.id = navParams.get("id");
      console.log(JSON.stringify(this.id));
  }

  ngOnInit(){
    this.getTransaction((this.id));
   }

  getTransaction(id) {
    this.transactionServices.getTransactionById(this.token, id).then((trns) => {
         // this.getTransaction(id);
         let respuesta = JSON.parse(trns["_body"]);
          console.log(respuesta.transaction)
          this.typeTransactionId = respuesta.transaction.typeTransactionId.name;
          this.userId = respuesta.transaction.userId.name1;
          this.userIda = respuesta.transaction.userId.name2;
          this.userIdb = respuesta.transaction.userId.surname1;
          this.userIdc = respuesta.transaction.userId.surname2;
          this.categoryId = respuesta.transaction.categoryId.name;
          this.productId = respuesta.transaction.productId.name;
          this.typeProductId = respuesta.transaction.typeProductId.name;
          this.measurementId = respuesta.transaction.measurementId.name;
          this.stateId = respuesta.transaction.stateId.name;
          this.publicationDate = respuesta.transaction.publicationDate;
          this.expirationDate = respuesta.transaction.expirationDate;
          this.description = respuesta.transaction.description;
          this.price = respuesta.transaction.price;
          //console.log(this.trans);
        }).catch((err) => {
          console.log(err);
    })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TransDescriptionPage');
  }

}
