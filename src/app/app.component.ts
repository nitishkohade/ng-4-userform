import {Component, OnInit, OnChanges} from "@angular/core"
import {Router, NavigationEnd} from "@angular/router";
import {ProductComponent} from "./components/productcomponent/product.component"
import {Service} from "./services/service";
import {SharedService} from "./services/sharedservice";

@Component({
    selector:"app-root",
    inputs:['displayTable'],
    template:`      
            <nav class="navbar navbar-inverse">
              <div class="container-fluid">
                <div class="navbar-header">
                  <a class="navbar-brand" href="#">
                    <img src="favicon.ico">
                  </a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                  <ul class="nav navbar-nav">
                    <li (click)="clickedToken()">
                      <a routerLink="/token" 
                        [ngStyle]="{'background': isToken?'magenta':'white',
                          'color': isToken?'white':'black'}"
                          routerLinkActive="active">Token</a>
                    </li>
                    <li (click)="clickedProduct()">
                      <a [routerLink]="['/products']"
                        [ngStyle]="{'background': isProduct?'magenta':'white',
                          'color': isProduct?'white':'black'}"
                          routerLinkActive="active">Products</a>
                    </li>
                  </ul>   
                 <form *ngIf="displaySearch==true" class="navbar-form navbar-right" role="search">
                    <div class="form-group">
                      <input 
                      [(ngModel)]="searchText"
                      (ngModelChange)="onChangeSearchText($event)"
                      [ngModelOptions]="{standalone: true}"
                      type="text" 
                      class="form-control" 
                      placeholder="Search">
                    </div>                   
                  </form>                
                </div>
              </div>
            </nav>
  <router-outlet>
  </router-outlet>`,
  styleUrls: ['./bootstrap.css', './font.css'],
  providers:[Service]
})
export class AppComponent implements OnInit, OnChanges{

  
  constructor(public service:Service, private router: Router, 
          public sharedService:SharedService){
  }
  searchText:string;
  subscription:any;
  isToken = false;
  isProduct = false;
   displaySearch:boolean = false;
  clickedToken() {
    this.displaySearch = false;
   this.isToken = true;
   this.isProduct = false;
  }

  clickedProduct() {  
   this.isToken = false;
   this.isProduct = true;
  }

  cssChangeUponRoute(urlHashValue){
    switch(urlHashValue){
      case "token":      
        this.isToken = true;
        break;
      case "products":        
        this.isProduct = true;
        break;
    }
  }

  emittedValueFromProduct(item: boolean) {
    this.displaySearch = item;
  }

  onChangeSearchText(newValue){
     this.sharedService.setSearchValue(newValue);
  }

  ngOnInit() {
    console.log(this)
 this.subscription = this.sharedService.getSearchVisibility()
      .subscribe(item => this.emittedValueFromProduct(item));

  this.router.events.subscribe(val=> {
    
    if (val instanceof NavigationEnd) {
      
    let url = this.router.parseUrl(this.router.url);
      let urlParam = url.root.children.primary.segments[0].path;
      
      this.cssChangeUponRoute(urlParam);

    }
  });

  }

  ngOnChanges(){
    console.log(123232)
  }

}