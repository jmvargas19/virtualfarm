import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionServicesProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello TransactionProvider Provider');
  }

  public getTransaction() {
    this.headersPost = new Headers( {
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*',
    });
    let optionspost = new RequestOptions( {
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.get('https://virtualfarm.herokuapp.com/api/transaction', optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }

  public getTransactionById(token, id) {
    this.headersPost = new Headers( {
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+ token
    });
    let optionspost = new RequestOptions( {
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.get('https://virtualfarm.herokuapp.com/api/transaction/' + id, optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }

  public NewTransaction(token, postParams) {

    let body='typeTransactionId=' + postParams.typeTransactionId + "&userId=" + postParams.userId 
    + "&categoryId=" + postParams.categoryId + "&productId=" + postParams.productId 
    + "&typeProductId=" + postParams.typeProductId + "&measurementId=" + postParams.measurementId 
    + "&stateId=" + postParams.stateId + "&price=" + postParams.price 
    + "&publicationDate=" + postParams.publicationDate + "&expirationDate=" + postParams.expirationDate 
    + "&description=" + postParams.description

    this.headersPost = new Headers ({
      'Content-Type':'Application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer ' + token
    });

    let optionspost = new RequestOptions ({
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.post('https://virtualfarm.herokuapp.com/api/transaction/', body, optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }

  public deleteTransaction(token, id) {
    this.headersPost = new Headers({
    'Content-Type':'Application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin':'*',
    'Authorization':'Bearer ' + token
    });

    let optionspost = new RequestOptions ({
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.delete('https://virtualfarm.herokuapp.com/api/transaction/' + id, optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }
}
