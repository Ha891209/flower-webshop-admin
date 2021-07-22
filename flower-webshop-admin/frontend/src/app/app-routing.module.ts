import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsComponent } from './page/bills/bills.component';
import { CustomersComponent } from './page/customers/customers.component';
import { DeliveriesComponent } from './page/deliveries/deliveries.component';
import { HomeComponent } from './page/home/home.component';
import { OrdersComponent } from './page/orders/orders.component';
import { ProductsComponent } from './page/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'bills',
    component: BillsComponent,
  },
  {
    path: 'deliveries',
    component: DeliveriesComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
