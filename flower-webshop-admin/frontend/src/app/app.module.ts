import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';

import { OrdersComponent } from './page/orders/orders.component';
import { CustomersComponent } from './page/customers/customers.component';
import { NavigationComponent } from './widget/navigation/navigation.component';
import { DataTableComponent } from './widget/data-table/data-table.component';
import { CustomerEditComponent } from './edit/customer-edit/customer-edit.component';
import { FlowerEditComponent } from './edit/flower-edit/flower-edit.component';
import { OrderEditComponent } from './edit/order-edit/order-edit.component';
import { FooterComponent } from './footer/footer/footer.component';
import { FlowersComponent } from './page/flowers/flowers.component';
import { SorterPipe } from './pipe/sorter.pipe';
import { FilterPipe } from './pipe/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    HomeComponent,
    CustomersComponent,
    NavigationComponent,
    DataTableComponent,
    CustomerEditComponent,
    FlowerEditComponent,
    OrderEditComponent,
    FooterComponent,
    FlowersComponent,
    SorterPipe,
    FilterPipe


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