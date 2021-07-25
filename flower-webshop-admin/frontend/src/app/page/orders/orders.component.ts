import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { ConfigService, ITableCol, SelectedToDelete } from 'src/app/service/config.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  tableColumns: ITableCol[] = this.config.orderTableCols;
  list$: Observable<Order[]> = this.orderService.list$;
  selectedToDelete: SelectedToDelete = this.config.selectedToDeleteOrder;

  constructor(
    private config: ConfigService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderService.getAll()
  }

  onClickDelete(order: Order): void {
    this.orderService.remove(order)
      .subscribe(
        () => {
          this.orderService.getAll();
          this.router.navigate(['/orders']);
        }
      )
  }
}
