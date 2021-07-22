import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  list$: Observable<Order[]> = this.orderService.getAll();

  constructor(
    private config: ConfigService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
  }

}
