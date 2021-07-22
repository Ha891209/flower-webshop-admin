import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';

import { OrdersComponent } from './page/orders/orders.component';
import { ProductsComponent } from './page/products/products.component';
import { CustomersComponent } from './page/customers/customers.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    HomeComponent,
    CustomersComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    { provide: LOCALE_ID, useValue: 'hu-HU' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }