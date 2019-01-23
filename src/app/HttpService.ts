import {Injectable} from '@angular/core';
import {Http, XHRBackend, 
  RequestOptions, Request, 
  RequestOptionsArgs, Response, 
  Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {    
    super(backend, options);
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>{
   let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    options = new RequestOptions({ headers: headers });
    return super.post(url, body, options).catch(this.catchAuthError(this));
  };


  get(url: string, token:string, options?: RequestOptionsArgs): Observable<Response>{

   let headers = new Headers({ 'Authorization': 'Bearer '+ token });
    options = new RequestOptions({ headers: headers });
    return super.get(url, options).catch(this.catchAuthError(this));
  };
 
  private catchAuthError (self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}