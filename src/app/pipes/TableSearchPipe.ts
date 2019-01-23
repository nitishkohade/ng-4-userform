import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
    name:'searchBy'
})
export class TableSearchPipe implements PipeTransform{
   

   transform(user:any[], str:string):any[]{     
       
    console.log(str)
             
    if (str==null || str=="") {
      return user;
    }

    if(str !== undefined){
        return user.filter(item=>item["productName"].toLowerCase().indexOf(str.toLowerCase()) !== -1)         ;
    }else{
        return user;
    }
   }
}

