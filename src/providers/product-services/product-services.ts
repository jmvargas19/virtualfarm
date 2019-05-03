import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductServicesProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello ProductServicesProvider Provider');
  }

  public getProduct(token) {
    this.headersPost = new Headers( {
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+ token
    });
    let optionspost = new RequestOptions( {
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.get('https://virtualfarm.herokuapp.com/api/product', optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }

  public NewProduct(token, postParams) {

    let body='name=' + postParams.name + "&categoryId=" + postParams.categoryId

    this.headersPost = new Headers ({
      'Content-Type':'Application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer ' + token
    });

    let optionspost = new RequestOptions ({
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.post('https://virtualfarm.herokuapp.com/api/product/', body, optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }

  public deleteProduct(token, id) {
    this.headersPost = new Headers({
    'Content-Type':'Application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin':'*',
    'Authorization':'Bearer ' + token
    });

    let optionspost = new RequestOptions ({
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.delete('https://virtualfarm.herokuapp.com/api/product/' + id, optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }
}
