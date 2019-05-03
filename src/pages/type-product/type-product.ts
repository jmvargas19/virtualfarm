import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TypeProductServicesProvider } from '../../providers/type-product-services/type-product-services';
import { ProductServicesProvider } from '../../providers/product-services/product-services';
import { TransactionPage } from "../transaction/transaction";

@IonicPage()
@Component({
  selector: 'page-type-product',
  templateUrl: 'type-product.html',
})
export class TypeProductPage {
  token: string;
  name: string;
  productId: string;
  products: string[];
  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public typeProductService: TypeProductServicesProvider,
    public productService: ProductServicesProvider, 
    public formBuilder: FormBuilder) {
      this.token = navParams.get('token');
    this.authForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      productId: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(){
    this.getProducts();
   }

   getProducts() {
    this.productService.getProduct(this.token).then((pdct) => {
      let respuesta = JSON.parse(pdct["_body"]);
      this.products = respuesta.products;
    }).catch((err) => {
      console.log(err);
    })
  }

  saveTypeProducts() {
    if(this.authForm.valid) {
      let postParams = {
        name : this.name,
        productId : this.productId,
      }

      this.typeProductService.NewTypeProduct(this.token, postParams).then((tpdc) => {
        alert(tpdc["statusText"]);
        this.navCtrl.setRoot(TransactionPage, {
          token: this.token
        });
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeProductPage');
  }

}
