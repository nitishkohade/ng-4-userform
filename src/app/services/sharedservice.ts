import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'


@Injectable()
export class SharedService {
  
  searchVisible: EventEmitter<boolean> = new EventEmitter();

  searchValue: EventEmitter<string> = new EventEmitter();

    constructor(){}

    setSearchVisibility(value:boolean) { 
     this.searchVisible.emit(value);
   }

    getSearchVisibility() {
     return this.searchVisible;
   }

    setSearchValue(value:string) {
     this.searchValue.emit(value);
   }

    getSearchValue() {
     return this.searchValue;
   }


} 