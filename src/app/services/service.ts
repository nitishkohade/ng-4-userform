
import {Injectable} from "@angular/core"
import {HttpService} from "../HttpService"
import  'rxjs/add/operator/map';
import  {Observable} from 'rxjs/Observable';
@Injectable()
export class Service{
token:string;
constructor(public http:HttpService){}

setToken(token:string):string{
    return this.token = token;
}

getToken(){
    return this.token;
}

callTokenNumber(url:string, body:string):Observable<any>{        
    return this.http.post(url, body)
    .map((res)=>{
       return res;
    });
}

getProducts(url:string):Observable<any>{
    return this.http.get(url, this.getToken())
    .map((res)=>{
       return res;
    });
}

}