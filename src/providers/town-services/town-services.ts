import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class TownServicesProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello TownServicesProvider Provider');
  }

  public getTown() {
    this.headersPost = new Headers( {
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*',
    });
    let optionspost = new RequestOptions( {
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.get('https://virtualfarm.herokuapp.com/api/town', optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }
}
