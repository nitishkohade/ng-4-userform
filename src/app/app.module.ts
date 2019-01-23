import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { TokenComponent } from './components/tokencomponent/token.component';
import { ProductComponent } from './components/productcomponent/product.component';
import {Service} from './services/service';
import {TableSortPipe} from "./pipes/TableSortPipe"
import {TableSearchPipe} from "./pipes/TableSearchPipe"
import {AppComponent} from "./app.component";
import {HttpService} from "./HttpService";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoadingBarModule, LoadingBarService} from "ng2-loading-bar";
 import {SharedService} from "./services/sharedservice";

const appRoutes: Routes = [
  { path: 'products', component: ProductComponent},
  { path: 'token',  component: TokenComponent },  
  { path: '',
    redirectTo: '/token',
    pathMatch: 'full'
  }
];

export function httpFactory(backend: XHRBackend, options: RequestOptions){	
        return new HttpService(backend, options);      
}

@NgModule({
  declarations: [AppComponent,
    TokenComponent, ProductComponent, TableSortPipe, TableSearchPipe
  ],
  imports: [
    LoadingBarModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports:[
    TableSortPipe, TableSearchPipe
  ],
  providers: [SharedService, {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }],
  bootstrap: [AppComponent]
})

export class AppModule { }
