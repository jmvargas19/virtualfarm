import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupServicesProvider {

  headers: Headers;
  headersPost: Headers;
  options: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello SignupServicesProvider Provider');
  }

  public signup (postParams) {
    let body = '&userName=' + postParams.userName +
    '&name1=' + postParams.name1 + '&name2=' + postParams.name2 + 
    '&surname1=' + postParams.surname1 + '&surname2=' + postParams.surname2 + 
    '&cellphone=' + postParams.cellphone + '&address=' + postParams.address + 
    '&departmentId=' + postParams.departmentId + '&townId=' + postParams.townId + 
    '&email=' + postParams.email + '&password=' + postParams.password;
    this.headersPost = new Headers({
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*'
    });
    let optionspost = new RequestOptions({
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      console.log(body);
      this.http.post('https://virtualfarm.herokuapp.com/api/signup', body, optionspost)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        resolve(err);
      });
    });
  }

  public getUser(token) {
    this.headersPost = new Headers( {
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+ token
    });
    let optionspost = new RequestOptions( {
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.get('https://virtualfarm.herokuapp.com/api/user', optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }
  public getUserById(token, id) {
    this.headersPost = new Headers( {
      'Content-Type':'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*',
      'Authorization':'Bearer '+ token
    });
    let optionspost = new RequestOptions( {
      headers: this.headersPost
    })

    return new Promise ((resolve, reject) => {
      this.http.get('https://virtualfarm.herokuapp.com/api/user/' + id, optionspost)
      .subscribe(res => {
        resolve(res);
      },(err) => {
        resolve(err);
      });
    });
  }
}
