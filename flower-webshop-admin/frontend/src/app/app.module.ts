import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './widget/navigation/navigation.component';
import { OrdersComponent } from './pages/listing/orders/orders.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderEditComponent } from './edit/order-edit/order.component';
import { SorterPipe } from './pipe/sorter.pipe';
import { FooterComponent } from './footer/footer/footer.component';
import { CustomersComponent } from './pages/listing/customers/customers.component';
import { CustomerEditComponent } from './edit/customer-edit/customer-edit.component';
import { FilterPipe } from './pipe/filter.pipe';
import { DataTableComponent } from './widget/data-table/data-table.component';
import { FlowersComponent } from './pages/listing/flowers/flowers.component';
import { FlowerEditComponent } from './edit/flower-edit/flower-edit.component';
import { TopoffersComponent } from './pages/topoffers/topoffers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    OrdersComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    OrderEditComponent,
    SorterPipe,
    FooterComponent,
    CustomersComponent,
    CustomerEditComponent,
    FilterPipe,
    FlowerEditComponent,
    FlowersComponent,
    TopoffersComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
