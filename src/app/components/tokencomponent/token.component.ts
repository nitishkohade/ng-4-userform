import {Component} from "@angular/core";
import {tokenUrl, productUrl, tokenBody} from "../../constants/constants";
import {Service} from "../../services/service";
import {LoadingBarService} from "ng2-loading-bar";

@Component({
   
    template:`    
    <loading-bar #loadingBar 
        [height]="height" 
        [color]="color" 
        [runInterval]="runInterval">
    </loading-bar>
    <span style="font-family:'Courier New', Courier, monospace;"
    *ngIf='token=="" && tokenError==false'>Please wait while trying to get the token number</span>
    <span style="font-family:'Courier New', Courier, monospace;"
    *ngIf='token!="" && tokenError==false'>Token Number: <b>{{token}}</b></span>
    <span style="font-family:'Courier New', Courier, monospace;"
    *ngIf='tokenError==true'>Unable to get the token, server responded with status {{errorStatus}}</span>
    `,
    providers:[Service, LoadingBarService]
})
export class TokenComponent{

    token:string;
    tokenError:boolean
    errorStatus:number;

    height:number;
    color:string;
    runInterval:number;

constructor(public service:Service, public loadingBarService: LoadingBarService){

    this.height = 2;
    this.color = "#FF00FF";
    this.runInterval = 300;
    this.getTokenNumber();
    this.token = "";
    this.tokenError = false;
    
}

    emitStart() {
        setTimeout(()=>{    
            this.loadingBarService.start();
        },1);
        
    }
 
    emitStop() {
        this.loadingBarService.stop();
    }
 
    emitComplete() {
        this.loadingBarService.complete();
    }

getTokenNumber(){
    this.emitStart(); 
    this.service.callTokenNumber(tokenUrl, tokenBody).subscribe((response)=>{
        let obj = response.json();
        this.token = obj["access_token"];
        this.service.setToken(this.token);
        this.tokenError = false;
        this.emitComplete()
    },(error)=>{
        this.emitStop();
        this.tokenError = true;
        this.errorStatus = 404;
    });
    }
}