import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TransactionServicesProvider } from '../../providers/transaction-services/transaction-services';
import { SignupServicesProvider } from '../../providers/signup-services/signup-services';
import { TypeTransactionServicesProvider } from '../../providers/type-transaction-services/type-transaction-services';
import { CategoryServicesProvider } from '../../providers/category-services/category-services';
import { ProductServicesProvider } from '../../providers/product-services/product-services';
import { TypeProductServicesProvider } from '../../providers/type-product-services/type-product-services';
import { MeasurementServicesProvider } from '../../providers/measurement-services/measurement-services';
import { StateServicesProvider } from '../../providers/state-services/state-services';
import { HomePage } from "../home/home";
import { NewProductPage } from "../new-product/new-product";
import { TypeProductPage } from "../type-product/type-product";
import { MeasurementPage } from "../measurement/measurement";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html',
})

export class TransactionPage implements OnInit {
  token: string;
  typeTransactionId: string;
  typeTransactions: string[];
  userId: string;
  users: string[];
  categoryId: string;
  categorys: string[];
  productId: string;
  products: string[];
  typeProductId: string;
  typeProducts: string[];
  measurementId: string;
  measurements: string[];
  stateId: string;
  states: string[];
  price: string;
  publicationDate: string;
  expirationDate: string;
  description: string;
  authForm: FormGroup;
  userName: string;

  constructor (public navCtrl: NavController, public navParams: NavParams, 
  public transactionServices: TransactionServicesProvider, 
  public signupServices: SignupServicesProvider,
  public typeTransactionServices: TypeTransactionServicesProvider,
  public categoryServices: CategoryServicesProvider, 
  public productServices: ProductServicesProvider,
  public typeProductServices: TypeProductServicesProvider,
  public measurementServices: MeasurementServicesProvider, 
  public stateServices: StateServicesProvider, public storage:Storage, 
  public formBuilder: FormBuilder) {
    this.token = navParams.get('token');
    this.authForm = formBuilder.group({
      typeTransactionId: ['', Validators.compose([Validators.required])],
      userId: ['', Validators.compose([Validators.required])],
      categoryId: ['', Validators.compose([Validators.required])],
      productId: ['', Validators.compose([Validators.required])],
      typeProductId: ['', Validators.compose([Validators.required])],
      measurementId: ['', Validators.compose([Validators.required])],
      stateId: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      publicationDate: ['', Validators.compose([Validators.required])],
      expirationDate: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(){
    this.getUsers();
    this.getTypeTransactions();
    this.getCategorys();
    this.getProducts();
    this.getTypeProducts();
    this.getMeasurements();
    this.getStates();
  }

  newProduct() {
    this.navCtrl.push(NewProductPage, {
      token: this.token
    });
  }

  newTypeProduct() {
    this.navCtrl.push(TypeProductPage, {
      token: this.token
    });
  }

  newMeasurement() {
    this.navCtrl.push(MeasurementPage, {
      token: this.token
    });
  }
 
  getUsers() {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.signupServices.getUser(this.token).then((usr) => {
        let respuesta = JSON.parse(usr["_body"]);
        this.users = respuesta.users;
     }).catch((err) => {
        console.log(err);
     })
    });
  }

  getTypeTransactions() {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.typeTransactionServices.getTypeTransaction(this.token).then((tptr) => {
        let respuesta = JSON.parse(tptr["_body"]);
        this.typeTransactions = respuesta.typeTransactions;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  getCategorys() {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.categoryServices.getCategory(this.token).then((ctgr) => {
        let respuesta = JSON.parse(ctgr["_body"]);
        this.categorys = respuesta.categorys;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  getProducts() {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.productServices.getProduct(this.token).then((prdc) => {
        let respuesta = JSON.parse(prdc["_body"]);
        this.products = respuesta.products;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  getTypeProducts() {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.typeProductServices.getTypeProduct(this.token).then((prdc) => {
        let respuesta = JSON.parse(prdc["_body"]);
        this.typeProducts = respuesta.typeProducts;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  getMeasurements() {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.measurementServices.getMeasurement(this.token).then((msrt) => {
        let respuesta = JSON.parse(msrt["_body"]);
        this.measurements = respuesta.measurements;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  getStates() {
    this.storage.get('token').then((val) => {
      this.token = val;
      this.stateServices.getState(this.token).then((stt) => {
        let respuesta = JSON.parse(stt["_body"]);
        this.states = respuesta.states;
      }).catch((err) => {
        console.log(err);
      })
    });
  }
 
  saveTransactions() {
    if(this.authForm.valid) {
      let postParams = {
        userId : this.userId,
        typeTransactionId : this.typeTransactionId,
        categoryId : this.categoryId,
        productId : this.productId,
        typeProductId : this.typeProductId,
        measurementId : this.measurementId,
        stateId : this.stateId,
        price : this.price, 
        publicationDate : this.publicationDate,
        expirationDate : this.expirationDate,
        description : this.description,
      }
     
      this.transactionServices.NewTransaction(this.token, postParams).then((trst) => {
        alert(trst["statusText"]);
        this.navCtrl.setRoot(HomePage, {
          token: this.token
        });
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionPage');
  }

}