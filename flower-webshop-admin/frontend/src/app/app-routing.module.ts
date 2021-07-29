import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditComponent } from './edit/customer-edit/customer-edit.component';
import { FlowerEditComponent } from './edit/flower-edit/flower-edit.component';
import { OrderEditComponent } from './edit/order-edit/order.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/listing/customers/customers.component';
import { FlowersComponent } from './pages/listing/flowers/flowers.component';
import { OrdersComponent } from './pages/listing/orders/orders.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TopoffersComponent } from './pages/topoffers/topoffers.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'flowers',
    component: FlowersComponent
  },
  {
    path: 'flowers/:id',
    component: FlowerEditComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'orders/:id',
    component: OrderEditComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'customers/:id',
    component: CustomerEditComponent
  },
  {
    path: 'topoffers',
    component: TopoffersComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
