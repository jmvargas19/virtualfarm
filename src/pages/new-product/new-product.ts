import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ProductServicesProvider } from '../../providers/product-services/product-services';
import { CategoryServicesProvider } from '../../providers/category-services/category-services';
import { TransactionPage } from "../transaction/transaction";

@IonicPage()
@Component({
  selector: 'page-new-product',
  templateUrl: 'new-product.html',
})
export class NewProductPage implements OnInit {
  token: string;
  name: string;
  categoryId: string;
  categorys: string[];
  authForm: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public productService: ProductServicesProvider,
    public categoryServices: CategoryServicesProvider, 
    public formBuilder: FormBuilder)
  {
    this.token = navParams.get('token');
    this.authForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*')])],
      categoryId: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(){
   this.getCategorys();
  }

  getCategorys() {
    this.categoryServices.getCategory(this.token).then((ctgr) => {
      let respuesta = JSON.parse(ctgr["_body"]);
      this.categorys = respuesta.categorys;
    }).catch((err) => {
      console.log(err);
    })
  }

  saveProducts() {
    if(this.authForm.valid) {
      let postParams = {
        name : this.name,
        categoryId : this.categoryId,
      }

      this.productService.NewProduct(this.token, postParams).then((pdct) => {
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
    console.log('ionViewDidLoad NewProductPage');
  }
}