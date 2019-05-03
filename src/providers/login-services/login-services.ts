import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginServicesProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello LoginServicesProvider Provider');
  }

  public login (postParams) {
    let body = 'userName=' + postParams.userName + '&password=' + postParams.password;
    this.headersPost = new Headers({
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*'
    });
    let optionspost = new RequestOptions({
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      console.log(body);
      this.http.post('https://virtualfarm.herokuapp.com/api/signin', body, optionspost)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        resolve(err);
      });
    });
  }
}
