import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the TypeTransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TypeTransactionServicesProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello TypeTransactionProvider Provider');
  }

  public getTypeTransaction(token) {
    this.headersPost = new Headers( {
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+ token
    });
    let optionspost = new RequestOptions( {
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.get('https://virtualfarm.herokuapp.com/api/type_transaction', optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }
}
