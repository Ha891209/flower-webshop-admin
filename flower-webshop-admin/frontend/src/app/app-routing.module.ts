import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditComponent } from './edit/customer-edit/customer-edit.component';
import { FlowerEditComponent } from './edit/flower-edit/flower-edit.component';
import { OrderEditComponent } from './edit/order-edit/order.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/listing/customers/customers.component';
import { FlowersComponent } from './pages/listing/flowers/flowers.component';
import { OrdersComponent } from './pages/listing/orders/orders.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TopoffersComponent } from './pages/topoffers/topoffers.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';

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
    component: FlowersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 1,
    }
  },
  {
    path: 'flowers/:id',
    component: FlowerEditComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2,
    }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 1,
    }
  },
  {
    path: 'orders/:id',
    component: OrderEditComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2,
    }
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 1,
    }
  },
  {
    path: 'customers/:id',
    component: CustomerEditComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2,
    }
  },
  {
    path: 'topoffers',
    component: TopoffersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
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
