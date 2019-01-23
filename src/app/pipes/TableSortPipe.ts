import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name:'orderBy'
})
export class TableSortPipe implements PipeTransform{

    sort(user:any[], args:Object):any[]{
        return user.sort(function(a, b){
           
            if(a[args["property"]] > b[args["property"]]){               
                return 1*args["direction"];
            }
            else if(a[args["property"]] < b[args["property"]]){                
                return -1*args["direction"];
            }
            else{
                return 0;
            }           
            
        });
    }

    sortSku(user:any[], args:Object):any[]{
        return user.sort(function(a, b){
           
            let sku = parseFloat(a[args["property"]]);
            let sku1 = parseFloat(b[args["property"]]);

            if(sku > sku1){               
                return 1*args["direction"];
            }
            else if(sku < sku1){                
                return -1*args["direction"];
            }
            else{
                return 0;
            }           
            
        });
    }

    sortRating(user:any[], args:Object):any[]{
        return user.sort(function(a, b){
           
            
            if(a[args["property"]]==""){
                a[args["property"]] = 0;
            }
            if(b[args["property"]]==""){
                b[args["property"]] = 0;
            }
            let sku = parseFloat(a[args["property"]]);
            let sku1 = parseFloat(b[args["property"]]);

            if(sku > sku1){               
                return 1*args["direction"];
            }
            else if(sku < sku1){                
                return -1*args["direction"];
            }
            else{
                return 0;
            }           
            
        });
    }

   transform(user:any[], args:Object):any[]{          
             
      switch(args["property"]){
        case "listPriceSku":
            return this.sortSku(user, args)
        case "rating":
            return this.sortRating(user, args)
        default:
            return  this.sort(user, args);
    }  
   }
}

