import {Component, OnInit, OnDestroy } from '@angular/core';
import {Service} from "../../services/service";
import {TableSortPipe} from "../../pipes/TableSortPipe"
import {tokenUrl, productUrl, tokenBody} from "../../constants/constants";
import {LoadingBarService} from "ng2-loading-bar";
import {SharedService} from "../../services/sharedservice";

@Component({

templateUrl:`./product.component.html`,
providers:[Service, LoadingBarService],
styleUrls: ['./bootstrap.css', './font.css', './style.css'],
outputs: ['displayTable']
})

export class ProductComponent implements OnInit{
searchText:string;

displayTable:boolean;
errorResponseMessage:boolean;

column:string=undefined;
direction:number=1;

products:Object[];

height:number;
color:string;
runInterval:number;
subscription:any;

constructor(public service:Service, public loadingBarService: LoadingBarService,
public sharedService:SharedService){  
   
    this.height = 2;
    this.color = "#FF00FF";
    this.runInterval = 300;
    this.errorResponseMessage = false;
    this.displayTable = false;
    this.getProducts();
    
}

emittedValueFromAppComponent(item: string) {
    this.searchText = item;
}

ngOnInit() {

    this.subscription = this.sharedService.getSearchValue()
      .subscribe(item => this.emittedValueFromAppComponent(item));
}


sortedColumn(col){   
    this.column = col;   
    if(this.direction==1){
        this.direction = -1;
    }
    else{
        this.direction = 1;
    }    
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

getProducts(){
    this.emitStart(); 
     this.service.callTokenNumber(tokenUrl, tokenBody).subscribe((response)=>{
         
        let obj = response.json();
  
        this.service.setToken(obj["access_token"]);
     
        this.service.getProducts(productUrl).subscribe((response)=>{
            let obj = response.json();
            this.products =  obj.values.products;

            this.products = this.products.map((product)=>{
                product["listPriceSku"]=product["listPriceSku"].split("|")[0]
                return product;
            })
            this.emitComplete()
            this.displayTable = true;
            this.errorResponseMessage = false;
            this.sharedService.setSearchVisibility(this.displayTable);
        },(error)=>{
            this.emitStop();
             this.displayTable = false;
             this.errorResponseMessage = true;
        })
        
    });
    
    
}

}
